# todo-list-server
Todo list api server

#to do list
GET /todolists
GET /todolist/{todo-list-id}
POST /todolist
PUT /todolist/{todo-list-id}
DELETE /todolist/{todo-list-id}

#to do item of to do list
GET /todolist/{todo-list-id}/todoitems
GET /todolist/{todo-list-id}/todoitem/{todo-item-id}
POST /todolist/{todo-list-id}/todoitem/
PUT /todolist/{todo-list-id}/todoitem/{todo-item-id}
DELETE /todolist/{todo-list-id}/todoitem/{todo-item-id}
