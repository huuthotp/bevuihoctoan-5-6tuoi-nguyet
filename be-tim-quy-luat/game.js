const patterns = [
    {
        sequence: ['🔴', '🟢', '🔵', '🔴', '🟢', '?', '🔴', '?', '🔵'],
        dapan: ['🔴', '🟢', '🔵', '🔴', '🟢', '🔵', '🔴', '🟢', '🔵'], // Quy luật màu sắc
        rule: 'Chọn hình theo quy luật: Đỏ, Xanh lá, Xanh dương thay nhau',
        options: ['🔴', '🟢', '🔵']  // Các lựa chọn để chọn vào ô trống
    },
    {
        sequence: ['🔴', '🔲', '▲', '🔴', '🔲', '?', '🔴', '?', '▲'], // Quy luật hình dạng
        dapan: ['🔴', '🔲', '▲', '🔴', '🔲', '▲', '🔴', '🔲', '▲'], // Quy luật hình dạng
        rule: 'Chọn hình theo quy luật: Tròn, Vuông, Tam giác thay nhau',
        options: ['🔴','🔲', '▲']  // Các lựa chọn để chọn vào ô trống
    },
	{
        sequence: ['🍊', '🥕', '🍊', '🥕', '🍊', '?', '🍊', '?', '🍊'],
        dapan: ['🍊', '🥕', '🍊', '🥕', '🍊', '🥕', '🍊', '🥕', '🍊'],
        rule: 'Chọn hình theo quy luật củ quả: Hình quả cam, hình củ cà rốt',
		options: ['🍊', '🥕']  // Các lựa chọn để chọn vào ô trống
    },
	{
        sequence: ['💙', '🦋', '💜', '💙', '🦋', '?','💙', '?', '💜'],
        dapan: ['💙', '🦋', '💜', '💙', '🦋', '💜','💙', '🦋', '💜'],
        rule: 'Chọn hình theo quy luật màu sắc của con bướm: Con bướm màu xanh, bướm màu tím',
		options: ['💙', '💜', '🦋']  // Các lựa chọn để chọn vào ô trống
    }
];

// Hàm hiển thị đề bài và các lựa chọn
function displayProblems() {
    const problemBoard = document.getElementById('problem-board');
    problemBoard.innerHTML = '';

    patterns.forEach((pattern, idx) => {
        const problemContainer = document.createElement('div');
        problemContainer.classList.add('problem-container');
        
        // Hiển thị dãy hình
        const board = document.createElement('div');
        board.classList.add('board');
        
        pattern.sequence.forEach((shape, index) => {
            const shapeDiv = document.createElement('div');
            shapeDiv.classList.add('shape');
            shapeDiv.textContent = shape;
            shapeDiv.setAttribute('draggable', shape === '???'); // Chỉ cho phép kéo thả ô '???'
            shapeDiv.dataset.index = index;  // Lưu chỉ mục cho việc kiểm tra

            // Nếu là ô trống, thiết lập khả năng drop
            shapeDiv.addEventListener('dragover', (e) => {
                e.preventDefault();  // Cho phép thả hình
            });

            shapeDiv.addEventListener('drop', (e) => {
                const draggedShape = e.dataTransfer.getData('shape');
                if (draggedShape) {
                    shapeDiv.textContent = draggedShape;  // Đặt hình đã kéo vào ô trống
                }
            });

            board.appendChild(shapeDiv);
        });

        // Hiển thị các lựa chọn trả lời
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        pattern.options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.textContent = option;
            optionDiv.draggable = true;

            // Thêm sự kiện dragstart cho các lựa chọn
            optionDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('shape', e.target.textContent);
            });

            optionsContainer.appendChild(optionDiv);
        });

        problemContainer.appendChild(board);
        problemContainer.appendChild(optionsContainer);
        problemBoard.appendChild(problemContainer);
    });
}

// Kiểm tra đáp án của người chơi
function checkAnswer() {
    const problemBoard = document.getElementById('problem-board');
    const resultDiv = document.getElementById('result');
    let isCorrect = true;

    // Kiểm tra đáp án cho mỗi đề bài
    patterns.forEach((pattern, index) => {
        const problemContainer = problemBoard.children[index];
        const board = problemContainer.querySelector('.board');
        const userSequence = Array.from(board.children).map(child => child.textContent);

        if (JSON.stringify(userSequence) !== JSON.stringify(pattern.dapan)) {
            isCorrect = false;
        }
    });

    // Hiển thị kết quả
    showPopup(isCorrect);
}

document.getElementById('check-btn').addEventListener('click', checkAnswer);

// Gọi hàm để hiển thị các đề bài và các hình lựa chọn
displayProblems();

function showPopup(isCorrect) {
	// Ví dụ thay thế các URL hiện tại bằng hình ảnh dễ thương:
	const correctImageUrl = './congratulations-13773_256.gif';  // Icon mừng chiến thắng dễ thương
	const incorrectImageUrl = './incorrect.gif';  // Icon thất bại dễ thương

	if (isCorrect) {
		showPopupMessage('CHÚC MỪNG !!! BẠN ĐÃ TRẢ LỜI CHÍNH XÁC!', correctImageUrl);
	} else {
		showPopupMessage('SAI RỒI !!! HÃY CỐ GẮNG LẦN SAU NHÉ!', incorrectImageUrl);
	}
}

function showPopupMessage(message, iconUrl) {
			const overlay = document.querySelector('.overlay');
			const popup = document.querySelector('.popup');
			const popupMessage = document.querySelector('.popup-message');
			const popupImage = document.querySelector('.popup-image');

			popupMessage.textContent = message;
			popupImage.src = iconUrl; // Cập nhật URL hình ảnh

			overlay.style.display = 'block';
			popup.style.display = 'block';

			setTimeout(() => {
				overlay.style.display = 'none';
				popup.style.display = 'none';
			}, 5000);
		}

