export const setComponent = (component) => {
    fetch(component.templateUrl).then((response) => {
        return response.text();
    }).then(function (template) {
        component.template = template;
        Vue.component(component.name, component);
    });
}

export const setRoutes = (routes, app) => {
    let routerFuncs = [];
    addFuncs(routes);
    async.parallel(routerFuncs, (err) => {
        console.log(VueRouter);
        const router = VueRouter({ routes });
        app.router = router;
        const appBuilt = new Vue(app);
    });

    function addFuncs(routes) {
        routes.forEach((route) => {
            if (route.children && route.children.length) {
                addFuncs(route.children);
            }
            routerFuncs.push((callback) => {
                fetch(route.component.templateUrl).then((response) => {
                    return response.text();
                }).then((template) => {
                    route.component.template = template;
                    callback();
                });
            });
        });
    }
}