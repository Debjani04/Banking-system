const transactionModel = require("../models/transaction");
const ledgerModel = require("../models/ledger.model");
const accountModel = require("../models/account.model")
const emailService = require("../services/email.service");

/** 
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW;
    * 1. Validate request
    * 2. Validate idempotance key
    * 3. Check account status
    * 4. Derive sender balance from ledger
    * 5. Create transaction (PENDING)
    * 6. Create DEBIT ledger entry
    * 7. Create CREDIT entry
    * 8. Mark transaction COMPLETED
    * 9. Commit MongoDB session 
    * 10. Send email notification 
 */


async function CreateTransaction ( req, res ) {
    
    /** 
     * 1. Validate request
    */

    const { fromAccount, toAccount, amount, idempotenceKey } = req.body ;

    if( !fromAccount || !toAccount || !amount || !idempotenceKey ) { 
         return res.send(400),json({
            message: "FromAccount, toAccount, amount and idempotenceKey is wrong"
         })
    } 

    /**
     * 2. Validate idempotence key
    */

    const isExistingTransaction = await transactionModel.findOne({
        idempotencyKey: idempotenceKey
    })

    if(isExistingTransaction) {
            if(isExistingTransaction.status === "COMPLETED" ){
                return res.send(200).json({
                    message: "Transaction Already processed",
                    transaction : isExistingTransaction,
                })
            }

            if(isExistingTransaction.status === "PENDING" ){
                return res.send(200).json({
                    message: "Transaction is still processing",
                })
            }

            if(isExistingTransaction.status === "FAILED" ){
                return res.send(500).json({
                    message: "Transaction falied, please try again",
                })
            }

            if(isExistingTransaction.status === "REVERSED" ){
                return res.send(500).json({
                    message: "Transaction was reversed, please try again",
                })
            }
    }

    /**
     * 3. Check account status
    */

    if(fromAccount.status !== "ACTIVE" || toAccount.status !== "ACTIVE") {
        return res.send(400).json({
            message: "Both fromAccount and toAccount must be active for transaction"
        })
    }

    /** 
     * 4. Derive sender balance from ledger
     */

    const balanceData = await fromAccount.getBalance()

    if( balance < amount ) { 
        res.status(400).json({
        message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}.`
        })
    }
}