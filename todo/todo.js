export default {
    templateUrl: 'todo/todo.html',
    data() {
        return {
            todos: [],
            selectedIndex: null,
            newTodo: {},
            score: 0,
            totalScore: 0
        }
    },
    created() {
        var vm = this;
        // vm.todos = JSON.parse(localStorage.todos || '[]');
        // vm.score = parseInt(JSON.parse(localStorage.score || '0'));
        // vm.totalScore = parseInt(JSON.parse(localStorage.totalScore || '0'));
    },
    methods: {
        toggleEdit(index) {
            let vm = this;
            vm.selectedIndex = index;
            vm.newTodo = JSON.parse(JSON.stringify(vm.todos[index]));
        },
        deleteItem(index) {
            let vm = this;
            if (confirm('You Sure Bruh?')) {
                let scr = parseInt(vm.todos[index].score);
                if (scr) localStorage.totalScore = JSON.stringify(vm.totalScore - scr);
                vm.todos.splice(index, 1);
                localStorage.todos = JSON.stringify(vm.todos);
            }
        },
        submit(e) {
            let vm = this;
            e.preventDefault();
            if (vm.selectedIndex === null) {
                vm.todos.push(vm.newTodo);
            } else {
                vm.totalScore -= parseInt(vm.todos[vm.selectedIndex].score);
                vm.todos[vm.selectedIndex] = vm.newTodo;
                vm.selectedIndex = null;
            }
            localStorage.todos = JSON.stringify(vm.todos);
            let scr = parseInt(vm.newTodo.score);
            vm.totalScore += scr;
            if (scr) localStorage.totalScore = JSON.stringify(vm.totalScore + scr);
            vm.newTodo = {};
        },
        done(todoIndex) {
            var vm = this;
            vm.score += parseInt(vm.todos[todoIndex].score);
            vm.$set(vm.todos[todoIndex], 'done', true);
            localStorage.todos = JSON.stringify(vm.todos);
            localStorage.score = JSON.stringify(vm.score);
        },
        undo(todoIndex) {
            var vm = this;
            vm.score -= parseInt(vm.todos[todoIndex].score);
            vm.$set(vm.todos[todoIndex], 'done', false);
            localStorage.todos = JSON.stringify(vm.todos);
            localStorage.score = JSON.stringify(vm.score);
        }
    }
};