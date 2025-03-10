# Task Manager Application

A simple yet powerful task management application built with React and Express. This application provides a clean interface for managing your daily tasks with support for persistent storage in JSON format.

## Features

- Create, read, update, and delete tasks
- Filter tasks by status (All, Active, Completed)
- Responsive design that works on both desktop and mobile
- View detailed information about each task
- Export tasks to JSON file
- Persistent storage using a JSON file on the server
- French language interface

## Technology Stack

- **Frontend**: React, React Router, Styled Components
- **Backend**: Express.js
- **Storage**: JSON file

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/DancingPumpkin65/gestion-taches.git
   cd gestion-taches
   ```

2. Install dependencies:
```bash
   npm install
```

3. run the application:
```bash
   npm run dev
```

## Project Structure

```
my-app/
├── public/                     # Public assets
│   └── Tache.json              # Task data storage file
├── server/                     # Backend server code
│   └── server.js               # Express server
├── src/                        # Frontend source code
│   ├── components/             # React components
│   │   ├── AddTaskForm.js      # Form to add new tasks
│   │   ├── EditTaskForm.js     # Form to edit tasks
│   │   ├── LoadingIndicator.js # Loading spinner
│   │   ├── TaskDetails.js      # Task details modal
│   │   ├── TaskFilter.js       # Task filtering component
│   │   ├── TaskItem.js         # Individual task item
│   │   └── TaskList.js         # List of tasks
│   ├── pages/                  # Page components
│   │   ├── HomePage.js         # Main page with task list
│   │   └── TaskDetailsPage.js  # Task details page
│   ├── services/               # API services
│   │   └── TaskService.js      # Service for task operations
│   ├── App.js                  # Main application component
│   ├── GlobalStyles.js         # Global styled components
│   ├── index.js                # Application entry point
│   └── theme.js                # Theme configuration
└── package.json                # Project dependencies
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Save all tasks (bulk update)
- `POST /api/tasks/add` - Add a new task
- `PUT /api/tasks/:id` - Update a specific task
- `DELETE /api/tasks/:id` - Delete a specific task

## Usage

### Adding a Task
1. Fill out the "Ajouter Tâche" (Add Task) form
2. Provide a title (required), optional ID, description, and status
3. Click "Ajouter" (Add)

### Editing a Task
1. Click the "Modifier" (Edit) button on a task
2. Update the task details in the form
3. Click "Valider" (Save) to confirm changes or "Annuler" (Cancel) to discard

### Viewing Task Details
Click the "Details" button on a task or navigate to `/tache/{task-id}` to see detailed information.

### Filtering Tasks
Use the filter buttons to show:
- All tasks ("tout")
- Active tasks ("non termine")
- Completed tasks ("termine")

### Exporting Tasks
Click the "export (json)" button to download a JSON file containing all tasks.

## License

This project is open source and available under the [MIT License](LICENSE).
