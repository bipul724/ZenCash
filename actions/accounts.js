"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


const serializeTransaction = (obj) => {
    const serialized = {...obj};
    if(obj.balance){
        serialized.balance = obj.balance.toNumber();
    }

    if(obj.amount){
        serialized.amount = obj.amount.toNumber();
    }

    return serialized;

}

export async function updateDefaultAccount(accountId){
    try {
        const {userId} = await auth();
            if(!userId){
                throw new Error("Unauthorized");
        
            }
        
            const user = await db.user.findUnique({
                where : {clerkUserId : userId},
            })
        
            if(!user){
                throw new Error("User not found");
            }

            await db.account.updateMany({
                where:{userId: user.id , isDefault:true},
                data : {isDefault:false},
            });

            const account = await db.account.update({
                where:{
                    id:accountId,
                    userId:user.id,
                },
                data:{isDefault:true},
            });
            revalidatePath("/dashboard");
            return {success:true,data:serializeTransaction(account)};
        
    } catch (error) {
        return {success:false,error:error.message};
    }
}

export async function getAccountWithTransactions(accountId){

    const {userId} = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }
        
    const user = await db.user.findUnique({
        where : {clerkUserId : userId},
    })
        
    if(!user){
        throw new Error("User not found");
    }

    const account = await db.account.findUnique({
        where:{id:accountId,userId:user.id},
        include : {
            transactions:{
                orderBy : {date : "desc"},
            },
            _count:{
                select : {transactions : true},
            },
        },
    });

    if(!account){
        return null;
    }

    return{
        ...serializeTransaction(account),
        transactions:account.transactions.map(serializeTransaction),
    }
}

export async function bulkDeleteTransactions(transactionIds) {
    try {
        const {userId} = await auth();
        if(!userId){
            throw new Error("Unauthorized");
        }
        
        const user = await db.user.findUnique({
            where : {clerkUserId : userId},
        })
        
        if(!user){
            throw new Error("User not found");
        }

        const transactions = await db.transaction.findMany({
            where : {
                id : {in : transactionIds},
                userId : user.id,
            },
        });

        const accountsBalanceChanges = transactions.reduce((acc,transaction)=>{
            const change = 
                transaction.type === "EXPENSE"
                ? transaction.amount
                : -transaction.amount;

            acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;

        },{});

        await db.$transaction(async(tx)=>{
            await tx.transaction.deleteMany({
                where : {
                    id :{in : transaction},
                }
            })
        })

        revalidatePath("/dashboard");
        revalidatePath("/account/[id]");

        return {success : true};
    } 
    catch (error) {
    return { success: false, error: error.message };
  }

}

export async function deleteAccount(accountId){
    try{
        const {userId} = await auth();
        if(!userId){
            throw new Error("Unauthorized");
        }

        const user = await db.user.findUnique({
            where : {clerkUserId : userId},
        });

        if(!user){
            throw new Error("User not found");
        }

        // Ensure the account belongs to the user
        const account = await db.account.findUnique({
            where : { id: accountId, userId: user.id },
            include: { _count: { select: { transactions: true } } },
        });

        if(!account){
            throw new Error("Account not found");
        }

        // Optional: prevent deleting default account if it's the only one
        const userAccountsCount = await db.account.count({ where: { userId: user.id } });
        if (userAccountsCount <= 1) {
            throw new Error("You must have at least one account.");
        }

        // Delete all transactions of the account first to respect FK constraints
        await db.$transaction(async(tx)=>{
            await tx.transaction.deleteMany({ where: { accountId: account.id } });
            await tx.account.delete({ where: { id: account.id } });
        });

        revalidatePath("/dashboard");
        return {success:true};
    }catch(error){
        return {success:false,error:error.message};
    }
}