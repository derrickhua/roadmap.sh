import pkg from 'pg';
const { Pool } = pkg;
// Database connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testcrud',
  password: 'password123',
  port: 5432,
});


var args = process.argv;
let option = args[2];
let input = args[3]

// Create
const createTodoItem = async (description) => {
    const result = await pool.query('INSERT INTO todo_list(description, completed) VALUES ($1, \'pending\') RETURNING *', [description]);
    console.log(result.rows[0]);
  };
  

const listTodoItems = async (status) => {
    let queryText = 'SELECT * FROM todo_list';
    let queryParams = [];

    // Filter based on the status parameter
    if (status === 'done' || status === 'pending') {
        queryText += ' WHERE completed = $1';
        queryParams.push(status);
    }

    try {
        const result = await pool.query(queryText, queryParams);
        console.log(result.rows);
    } catch (err) {
        console.error('Error reading todo items:', err);
    }
};

// Update - Simplified to only mark an item as 'done'
const markTodoItemAsDone = async (todo_id) => {
    const result = await pool.query('UPDATE todo_list SET completed = \'done\' WHERE todo_id = $1 RETURNING *', [todo_id]);
    console.log(result.rows[0]);
};

// Delete (No changes needed)
const deleteTodoItem = async (todo_id) => {
    const result = await pool.query('DELETE FROM todo_list WHERE todo_id = $1 RETURNING *', [todo_id]);
    console.log(result.rows[0]);
};

try {
    switch (option) {
        case '--new':
            createTodoItem(input).catch(console.error);
            break;
        case '--list':
            listTodoItems(input).catch(console.error);
            break;
        case '--done':
            markTodoItemAsDone(input).catch(console.error);
            break;
        case '--delete':
            deleteTodoItem(input).catch(console.error);
            break;
        case '--delete':
            deleteTodoItem(input).catch(console.error);
            break;
        case '--help':
            console.log('Usage: node test.js [option] [input]. Your options are --new [todo name], --list [all/pending/done], --done [id], --delete [id], --help, --version');
            break;
        case '--version':
            console.log('Version 1.0');
            break;
        default:
            console.log('Operation not supported.');
    }
  } catch (error) {
    console.error(error);
  }

