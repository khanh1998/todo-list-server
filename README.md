## **To-do list API**
This is an API help you maintain a to-do list
You can create a list, add task to list and then create steps of new task
## #List

 - [ ] GET /list
 Get all list of current user
 - [ ] GET /list/{ list-id }
 Get a specific list
 - [ ] POST /list
Create a new list
JSON request body


>     {
>         "tasks": [
>             {
>                 "completed": false,
>                 "steps": [
>                     {
>                         "completed": false,
>                         "name": "chatting with best friends"
>                     }
>                 ],
>                 "name": "chatting with best friends",
>                 "description": "chatting with best friends",
>                 "note": "chatting with best friends",
>                 "expirationTime": "1519211810362",
>                 "remindingTime": "1519211809934",
>                 "priority": 5,
>                 "repeat": {}
>             }
>         ],
>         "name": "chatting with best friends",
>         "description": "chatting with best friends"
>     }

 - [ ] PATCH /list/{ list-id }
 Update list's information

> {
>     "name": "chatting with 3 best friends",
>     "description": "chatting with 3 best friends"  
> }

 - [ ] DELETE /list/{ list-id }

## #Task

 - [ ] GET /list/{ list-id }/task
 Get all tasks of a list
 - [ ] GET /list/{ list-id }/task/{ task-id }
 Get a specific task of a specific list
 - [ ] POST /list/{ list-id }/task
 Create a new task and add to a list

> {
>     "completed": false,
>     "steps": [
>         {
>             "completed": false,
>             "name": "chatting with best friends"
>         },
>         {
>             "completed": false,
>             "name": "chatting with best friends"
>         }
>     ],
>     "name": "chatting with best friends",
>     "description": "chatting with best friends",
>     "note": "chatting with best friends",
>     "expirationTime": 1519211810362,
>     "remindingTime": 1519211809934,
>     "priority": 4 
>     }

 - [ ] PUT /list/{ list-id }/task/{ task-id }
Update information of a task which belong to a specific list

> {
>     "completed": false,
>     "steps": [
>         {
>             "completed": false,
>             "name": "chatting with best friends"
>         },
>         {
>             "completed": false,
>             "name": "chatting with best friends"
>         }
>     ],
>     "name": "chatting with best friends",
>     "description": "chatting with best friends",
>     "note": "chatting with best friends",
>     "expirationTime": 1519211810362,
>     "remindingTime": 1519211809934,
>     "priority": 4 
>     }

 - [ ] DELETE /list/{ list-id }/task/{ task-id }
Delete a task of a specific list


