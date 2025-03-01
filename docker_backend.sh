#!/bin/bash

# Define the backend service name
MYSQL_CONTAINER="mysql_container123"
BACKEND_CONTAINER="node_crud_api"

# Function to start backend & MySQL containers
start() {
    echo "🚀 Starting backend and MySQL containers..."
    docker-compose up -d --build
    echo "✅ Containers started!"

    # 🔄 Wait for MySQL to be ready
    echo "⏳ Waiting for MySQL to be ready..."
    until docker exec mysql_container123 mysqladmin ping -h mysql --silent; do
        echo "⏳ Waiting for MySQL..."
        sleep 2
    done
    echo "✅ MySQL is ready!"

    # 🔄 Run init.sql inside MySQL
    echo "🔄 Running init.sql in MySQL..."
    docker exec -i mysql_container123 mysql -h mysql -P 3306 -u root -ppreet todo_db < init.sql
    echo "✅ Database initialized!"
}


# Function to stop containers
stop() {
    echo "🛑 Stopping backend and MySQL containers..."
    docker-compose down
    echo "✅ Containers stopped!"
}

# Function to remove all containers, volumes, and networks
clean() {
    echo "🗑️ Removing all containers, volumes, and networks..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Cleanup complete!"
}

# Function to restart backend container
restart_backend() {
    echo "🔄 Restarting the backend container..."
    docker restart $BACKEND_CONTAINER
    echo "✅ Backend restarted!"
}

# Function to rebuild everything
rebuild() {
    echo "🔄 Rebuilding everything..."
    clean
    start
}

# Function to check MySQL logs
mysql_logs() {
    echo "📜 Showing MySQL logs..."
    docker logs -f $MYSQL_CONTAINER
}
init_db() {
    echo "🔄 Running init.sql in MySQL..."
    docker exec -i mysql_container123 mysql -u root -ppreet todo_db < init.sql
    echo "✅ Database initialized!"
}

# Help menu
help_menu() {
    echo "Usage: ./docker_backend.sh [COMMAND]"
    echo "Commands:"
    echo "  start          - Start backend & MySQL containers"
    echo "  stop           - Stop containers"
    echo "  clean          - Remove containers, volumes, and networks"
    echo "  restart        - Restart backend container"
    echo "  rebuild        - Clean and restart everything"
    echo "  mysql_logs     - View MySQL logs"
    echo "  init_db         - to initialize the db"
    echo "  help           - Show this menu"
}
test() {
    echo "🔄 Running init.sql before tests..."
    docker exec -i mysql_container123 mysql -h mysql -P 3306 -u root -ppreet todo_db < init.sql
    echo "✅ init.sql executed successfully!"
    
    echo "🧪 Running Jest tests..."
    jest --verboes
    echo "✅ Tests completed!"
}


# Handle command-line arguments
case "$1" in
    start) start ;;
    stop) stop ;;
    test) test ;;
    clean) clean ;;
    restart) restart_backend ;;
    rebuild) rebuild ;;
    mysql_logs) mysql_logs ;;
    help) help_menu ;;
    init_db) init_db ;;
    *) echo "❌ Invalid command! Use './docker_backend.sh help' for options."; exit 1 ;;
esac
