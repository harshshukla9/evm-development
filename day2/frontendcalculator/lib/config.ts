export  default  {
    contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi :  [
        {
          "type": "constructor",
          "inputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "addCandidate",
          "inputs": [
            {
              "name": "_candidateName",
              "type": "string",
              "internalType": "string"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "candidatesName",
          "inputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "outputs": [
            {
              "name": "",
              "type": "string",
              "internalType": "string"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "getCandidateNames",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "string[]",
              "internalType": "string[]"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "getNoOfCandidates",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "getVotes",
          "inputs": [
            {
              "name": "_candidateName",
              "type": "string",
              "internalType": "string"
            }
          ],
          "outputs": [
            {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "owner",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "address"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "vote",
          "inputs": [
            {
              "name": "_candidateName",
              "type": "string",
              "internalType": "string"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        }
      ]
        
    

}