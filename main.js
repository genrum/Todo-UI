const storage = {
    list: "taskList",
    saveList: function(list) {
        localStorage.setItem(this.list, JSON.stringify(list))
        console.log("saved the list")
    },
    getList: function() {
        console.log("gettin the list")
        return JSON.parse( localStorage.getItem(this.list) );
    }
}

export const STATUS = {
    TODO: "To Do",
    DONE: "Done",
}

export const PRIORITY = {
    HIGH: "high",
    LOW: "low",
}

export let list = storage.getList() || [
    // {name: "write a post", status: "To Do", priority: "low",}, 
    // {name: "test", status: "Done", priority: "high",},
];

export function changeStatus(task) {
    let taskaName = list.find(item => item.name == task);
   if (list.find(item => item.name == task) === undefined) {
    console.log(`can't change "${task}" status cause there's no such task`);
   } else {
    list.find(item => item.name == task).status = (taskaName.status == STATUS.TODO) ? STATUS.DONE : STATUS.TODO;
   }
   storage.saveList(list);
   console.log(list);
}

export function addTask(name, priority) {
    if (name === "") return;
    const task = new Task(name, priority);
    list.push(task);

    // list.push({name, status: STATUS.TODO, priority});
    storage.saveList(list);
    console.log(list);
}

export function deleteTask(task, priority) {
    /* let deleteIndex = list.findIndex(item => item.name == task);
    if (deleteIndex < 0) {
        console.log(`can't delete "${task}" cause it doesn't exist`)
    } else {
        list.splice(deleteIndex, 1)
    }  */
   /*  let deleteIndex = list.findIndex((item) => {
        item.name == task && item.priority == priority
        }
    ); */
    list = list.filter(item => {
        item.name !== task && item.priority !== priority
    });

    console.log(list);
    storage.saveList(list);
}

export function Task(name, priority) {
    this.name = name;
    this.status = STATUS.TODO;
    this.priority = priority;
}
