document.addEventListener('DOMContentLoaded', () => {
    const characterTableBody = document.getElementById('character-table-body');
    const characterForm = document.getElementById('character-form');
    const errorContainer = document.getElementById('error-container');
    const successContainer = document.getElementById('success-container');

    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        successContainer.style.display = 'none';
    }

    function showSuccess(message) {
        successContainer.textContent = message;
        successContainer.style.display = 'block';
        errorContainer.style.display = 'none';
    }

    function clearMessages() {
        errorContainer.style.display = 'none';
        successContainer.style.display = 'none';
    }

    async function fetchCharacters() {
        try {
            const response = await fetch('/characters');
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message);
            }
            const characters = await response.json();
            renderCharacters(characters);
        } catch (error) {
            showError(error.message);
        }
    }

    function renderCharacters(characters) {
        characterTableBody.innerHTML = '';
        if (characters.length === 0) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 3;
            cell.textContent = 'No characters found.';
            cell.style.textAlign = 'center';
            row.appendChild(cell);
            characterTableBody.appendChild(row);
            return;
        }

        characters.forEach(char => {
            const tr = document.createElement('tr');
            
            const nameTd = document.createElement('td');
            nameTd.textContent = char.name;
            tr.appendChild(nameTd);

            const roleTd = document.createElement('td');
            roleTd.textContent = char.role;
            tr.appendChild(roleTd);

            const planetTd = document.createElement('td');
            planetTd.textContent = char.planet;
            tr.appendChild(planetTd);

            // Note: id is intentionally omitted and not displayed.

            characterTableBody.appendChild(tr);
        });
    }

    characterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearMessages();

        const name = document.getElementById('name').value.trim();
        const role = document.getElementById('role').value;
        const planet = document.getElementById('planet').value.trim();

        try {
            const response = await fetch('/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, role, planet })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message);
            }

            showSuccess('Character created successfully!');
            characterForm.reset();
            await fetchCharacters();
        } catch (error) {
            showError(error.message);
        }
    });

    // Initial load
    fetchCharacters()
});
