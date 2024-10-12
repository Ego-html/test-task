// Функция для обмеження вода тільки цифр та відображення повідомлення добутку цифр
function allowOnlyNumbers(event) {
    const input = event.target;
    const value = input.value;
    const errorMessage = input.nextElementSibling;

    if (/[^0-9]/g.test(value)) {
        errorMessage.textContent = 'Можно вводити тільки цифри';
    } else {
        errorMessage.textContent = '';
    }

    input.value = value.replace(/[^0-9]/g, '');
    calculateRowProduct(input.closest('tr'));
}

// Функція для підрахунку добутку чисел
function calculateRowProduct(row) {
    const inputs = row.querySelectorAll('input.form-control:not(.result-cell)');
    let product = 1;
    let validInputs = false;

    inputs.forEach(input => {
        const value = input.value;

        if (value !== '') {
            product *= parseFloat(value);
            validInputs = true;
        }
    });

    const resultCell = row.querySelector('.result-cell');
    resultCell.value = validInputs ? product : '';
}

// Функція для додавання нової ячейки
function addNewCell(row) {
    const newCell = document.createElement('td');
    const newInput = document.createElement('input');

    newInput.type = 'text';
    newInput.classList.add('form-control', 'input-custom', 'input-animate');

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message', 'text-danger');

    newCell.append(newInput, errorDiv);

    const resultCell = row.querySelector('.result-cell').parentElement;
    row.insertBefore(newCell, resultCell);

    // Затримка для анімації появлення
    setTimeout(() => {
        newInput.classList.add('show');
    }, 10);
}

// Обробник кнопок для додавання нової клітини
function handleAddCellButtonClick(event) {
    const row = event.target.closest('tr');
    addNewCell(row);
}

const addCellButtons = document.querySelectorAll('.add-cell');
addCellButtons.forEach(button => {
    button.addEventListener('click', handleAddCellButtonClick);
});

const table = document.querySelector('.table');
table.addEventListener('input', allowOnlyNumbers);

window.addEventListener('load', () => {
    const inputs = document.querySelectorAll('input.form-control:not(.result-cell)');

    inputs.forEach(input => {
        input.value = '';
    });

    const resultCells = document.querySelectorAll('.result-cell');
    resultCells.forEach(resultCell => {
        resultCell.value = '';
    });
});
