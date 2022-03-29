window.addEventListener('DOMContentLoaded', () => {
    const onboarding = new MetaMaskOnboarding();
    const onboardButton = document.getElementById('connectWallet');
    let accounts;


    const rpcURL = 'https://mainnet.infura.io/v3/4dce19c52fa24d6bbb086fca79cdae06'
    const web3 = new Web3(rpcURL)

    const updateButton = async() => {
        if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
            onboardButton.innerText = 'Install MetaMask!';
            onboardButton.onclick = () => {
                onboardButton.innerText = 'Connecting...';
                onboardButton.disabled = true;
                onboarding.startOnboarding();
            };
        } else if (accounts && accounts.length > 0) {
            onboardButton.innerText = ` ...${accounts[0].slice(-8)}`;
            onboardButton.disabled = true;
            onboarding.stopOnboarding();

        } else {
            onboardButton.innerText = 'Connect MetaMask!';
            onboardButton.onclick = async() => {
                await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    })
                    .then(function(accounts) {
                        onboardButton.innerText = `...${accounts[0].slice(-8)}`;
                        onboardButton.disabled = true;
                    });
            };
        }
    };

    updateButton();
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum.on('accountsChanged', (newAccounts) => {
            accounts = newAccounts;
            updateButton();
        });
    }

    let tokenAddress = "0xDA0c94c73D127eE191955FB46bACd7FF999b2bcd";

    // The minimum ABI to get ERC20 Token balance
    let minABI = [
        // balanceOf
        {
            "constant": true,
            "inputs": [{ "name": "_owner", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "balance", "type": "uint256" }],
            "type": "function"
        },
        // decimals
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{ "name": "", "type": "uint8" }],
            "type": "function"
        }
    ];

    let ETH_VALUE = 10 ** 18
    let contract = new web3.eth.Contract(minABI, tokenAddress);
    let acc = ethereum.request({ method: 'eth_accounts' })



    async function getBalance() {
        // Filter Wallet Address
        Promise.all([acc]).then(async function(values) {
            console.log(values[0]);

            let value = String(values[0])

            let balance = await contract.methods.balanceOf(value).call();
            // Filter Balance
            balance = parseInt(balance);
            // Convert Balance to Float with 2 decimals and display in wallet balance field
            document.getElementById("wallet_balance").childNodes[0].textContent = 'Balance: ' + (balance / ETH_VALUE).toFixed(0) + ' STANDARD'
        });
    }

    // Filter Balance
    Promise.all([getBalance()]).then(function(values) {
        console.log(values);
    });

    // Reload UI
    window.onfocus = () => {
        window.location.reload();
    }

    const first = {
        getBalance
    }

});