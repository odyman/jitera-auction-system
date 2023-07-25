module.exports = {
    apps : [
        {
            name: "auction-api",
            script: "./app.js",
            watch: false,
            ignore_watch: ["node_modules", "download"],
            watch_options: {
                followSymlinks: false
            },
            instance_var: 'INSTANCE_ID'
        }
    ]
};
