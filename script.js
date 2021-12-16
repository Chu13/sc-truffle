const Web3 =  require("web3");
const Contract =  require("./build/contracts/Token.json");
const sender = "0x5cc9863187A6f86fe28a80c325933595C30d583a";
const receiver = "0x6F6f879308E48d5464025f6456B7d081B3a0E5fd"
const contractAddress = "0x20E273608889554b8d81625F014590f1C7851064";
const fs = require('fs');
const privateKey = fs.readFileSync("./private-key.txt").toString().trim();

const init = async () => {
    const web3 = new Web3("https://rpc-mumbai.maticvigil.com");
    
    const nonce = await web3.eth.getTransactionCount(sender, 'latest');
    
    const contract = new web3.eth.Contract(
        Contract.abi,
        contractAddress
    )
        
    let totalSupply = await contract.methods.totalSupply().call();
    totalSupply = web3.utils.fromWei(totalSupply, "ether")
    console.log('totalSupply', totalSupply)
    

    let balanceOf = await contract.methods.balanceOf(sender).call();
    balanceOf = web3.utils.fromWei(balanceOf, "ether")
    console.log('balanceOf', balanceOf)

    let amount = web3.utils.toWei("1234780", "ether");
    const data = contract.methods.transfer(receiver, amount).encodeABI()

    const transaction = {
        'to': contractAddress,
        'value': 0,
        'nonce': nonce,
        "gas": 10010499,
        "data": data
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
        if (!error) {
            console.log("The hash of the transaction is: ", hash);
        } else {
            console.log("Something went wrong while submitting the transaction:", error)
        }
    });
}

init()