const patterns = [
    {
        sequence: ['🔴', '🟢', '🔵', '🔴', '🟢', '?', '🔴', '?', '🔵'],
        dapan: ['🔴', '🟢', '🔵', '🔴', '🟢', '🔵', '🔴', '🟢', '🔵'],
        rule: 'Chọn hình theo quy luật: Đỏ, Xanh lá, Xanh dương thay nhau',
        options: ['🔴', '🟢', '🔵']
    },
    {
        sequence: ['🔴', '🔲', '▲', '🔴', '🔲', '?', '🔴', '?', '▲'],
        dapan: ['🔴', '🔲', '▲', '🔴', '🔲', '▲', '🔴', '🔲', '▲'],
        rule: 'Chọn hình theo quy luật: Tròn, Vuông, Tam giác thay nhau',
        options: ['🔴', '🔲', '▲']
    },
    {
        sequence: ['🍊', '🥕', '🍊', '🥕', '🍊', '?', '🍊', '?', '🍊'],
        dapan: ['🍊', '🥕', '🍊', '🥕', '🍊', '🥕', '🍊', '🥕', '🍊'],
        rule: 'Chọn hình theo quy luật củ quả: Hình quả cam, hình củ cà rốt',
        options: ['🍊', '🥕']
    },
    {
        sequence: ['💙', '🦋', '💜', '💙', '🦋', '?', '💙', '?', '💜'],
        dapan: ['💙', '🦋', '💜', '💙', '🦋', '💜', '💙', '🦋', '💜'],
        rule: 'Chọn hình theo quy luật màu sắc của con bướm: Con bướm màu xanh, bướm màu tím',
        options: ['💙', '💜', '🦋']
    }
];

function displayProblems() {
    const problemBoard = document.getElementById('problem-board');
    problemBoard.innerHTML = '';

    patterns.forEach((pattern, idx) => {
        const problemContainer = document.createElement('div');
        problemContainer.classList.add('problem-container');
        
        const board = document.createElement('div');
        board.classList.add('board');
        
        pattern.sequence.forEach((shape, index) => {
            const shapeDiv = document.createElement('div');
            shapeDiv.classList.add('shape');
            shapeDiv.textContent = shape;
            shapeDiv.setAttribute('draggable', shape === '?');
            shapeDiv.dataset.index = index;

            shapeDiv.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            shapeDiv.addEventListener('drop', (e) => {
                const draggedShape = e.dataTransfer.getData('shape');
                if (draggedShape) {
                    shapeDiv.textContent = draggedShape;
                }
            });

            board.appendChild(shapeDiv);
        });

        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
        pattern.options.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.textContent = option;
            optionDiv.draggable = true;

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

function checkAnswer() {
    const problemBoard = document.getElementById('problem-board');
    const resultDiv = document.getElementById('result');
    let isCorrect = true;

    patterns.forEach((pattern, index) => {
        const problemContainer = problemBoard.children[index];
        const board = problemContainer.querySelector('.board');
        const userSequence = Array.from(board.children).map(child => child.textContent);

        if (JSON.stringify(userSequence) !== JSON.stringify(pattern.dapan)) {
            isCorrect = false;
        }
    });

    showPopup(isCorrect);
}

document.getElementById('check-btn').addEventListener('click', checkAnswer);

displayProblems();

function showPopup(isCorrect) {
    const correctImageUrl = './congratulations-13773_256.gif';
    const incorrectImageUrl = './incorrect.gif';

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
    popupImage.src = iconUrl;

    overlay.style.display = 'block';
    popup.style.display = 'block';

    setTimeout(() => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }, 5000);
}