function storage() {
        const borrowedInfo = localStorage.getItem(equipmentItem.textContent.trim());
        console.log(borrowedInfo);

        }
    window.onload = function() {
        const equipmentItems = document.querySelectorAll('.equipment-item');
        equipmentItems.forEach(function(item) {
            const borrowInfo = item.querySelector('.borrow-info');
            const borrowStatus = localStorage.getItem(item.textContent.trim());
            if (borrowStatus) {
                const [status, info] = borrowStatus.split('|');
                if (status === 'borrowed') {
                    const [date, time, user] = info.split(',');
                    borrowInfo.textContent = ` 借用時間: ${date} ${time} 借用人: ${user}`;
                }
            }
        });
    };

    function toggleBorrow(button) {
        const equipmentItem = button.parentElement;
        const borrowInfo = equipmentItem.querySelector('.borrow-info');
        const currentTime = new Date();
        const month = currentTime.getMonth() + 1;
        const date = currentTime.getDate();
        const hour = currentTime.getHours();
        const minute = currentTime.getMinutes();
        const currentUser = localStorage.getItem('currentUser');
        if (button.textContent === '借用') {
            equipmentItem.classList.add('borrowed');
            button.textContent = '歸還';
            const borrowTime = `${month}/${date} ${hour}:${minute}`;
            borrowInfo.textContent = ` 借用時間: ${borrowTime} 借用人: ${currentUser}`;
            localStorage.setItem(equipmentItem.textContent.trim(), `borrowed|${borrowTime},${currentUser}`);
            const borrowedInfo = localStorage.getItem(equipmentItem.textContent.trim());
            console.log(borrowedInfo);
        } else {
            equipmentItem.classList.remove('borrowed');
            button.textContent = '借用';
            borrowInfo.textContent = '';
            localStorage.removeItem(equipmentItem.textContent.trim());
        }
    }

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var accounts = {
            "YUUUU": "0719",
            "Nana": "123",
            "109303": "123456"
            // Add more here
        };
    
        if (accounts.hasOwnProperty(username) && accounts[username] === password) {
            localStorage.setItem('currentUser', username);
            window.location.href = "equipment.html";
        } else {
            document.getElementById("error").style.display = "block";
        }
    });
    
