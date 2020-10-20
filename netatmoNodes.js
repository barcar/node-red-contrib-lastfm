
netatmo = require('@Darkzor/drk-netatmo');

module.exports = function(RED) {
    "use strict";

    function NetatmoGetNetatmoObject(config, msg, node) {
        var creds = RED.nodes.getNode(config.creds);
        var auth = {
            "client_id": creds.client_id,
            "client_secret": creds.client_secret
        };
        if (msg.code) {
            auth['code'] = msg.code;
        }
        else if (msg.username && msg.password) {
            auth['username'] = msg.username;
            auth['password'] = msg.password;
        }
        else if(creds.code) {
            auth['code'] = creds.code;
        }
        else if(creds.username && creds.password) {
            auth['username'] = creds.username;
            auth['password'] = creds.password;
        }
        var api = new netatmo(auth);

        api.on("error", function (error) {
            node.error(error);
        });

        api.on("warning", function (error) {
            node.warn(error);
        });

        return api;
    }

    class NetatmoConfigNode {
        constructor(n) {
            RED.nodes.createNode(this, n);
            this.client_id = n.client_id;
            this.client_secret = n.client_secret;
            this.username = n.username;
            this.password = n.password;
            this.code = n.code;
        }
    }
    RED.nodes.registerType("configNode",NetatmoConfigNode);

    class NetatmoGetHomeData {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {

                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                if(config.home_id) data['home_id'] = config.home_id;
                if(msg.home_id) data['home_id'] = msg.home_id;
                api.getHomeData(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("get home data",NetatmoGetHomeData);

    class NetatmoGetPublicData {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['lat_ne', 'lon_ne', 'lat_sw', 'lon_sw', 'required_data', 'filter'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                })
                api.getPublicData(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("get public data",NetatmoGetPublicData);

    class NetatmoGetStationsData {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['device_id', 'get_favorites'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.getStationsData(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("get stations data",NetatmoGetStationsData);

    class NetatmoGetMeasure {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['device_id', 'module_id', 'scale', 'type', 'date_begin', 'date_end', 'limit', 'optimize', 'real_time'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.getMeasure(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("get measure",NetatmoGetMeasure);

    class NetatmoGetEventsUntil {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['home_id', 'event_id'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.getEventsUntil(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("get events until",NetatmoGetEventsUntil);
    
    class NetatmoGetLastEventOf {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['home_id', 'person_id', 'offset'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.getLastEventOf(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("get last event of",NetatmoGetLastEventOf);

    class NetatmoGetNextEvents {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['home_id', 'event_id', 'size'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.getNextEvents(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("get next events",NetatmoGetNextEvents);

    class NetatmoGetCameraPicture {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['image_id', 'key'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.getCameraPicture(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("get camera picture",NetatmoGetCameraPicture);

    class NetatmoSetPersonsAway {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['home_id', 'person_id'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.setPersonsAway(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("set persons away",NetatmoSetPersonsAway);

    class NetatmoSetPersonsHome {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['home_id', 'person_ids'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.setPersonsHome(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("set persons home",NetatmoSetPersonsHome);

    class NetatmoAddWebhook {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = ['url'];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.addWebhook(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });

        }
    }
    RED.nodes.registerType("add webhook",NetatmoAddWebhook);

    class NetatmoDropWebhook {
        constructor(config) {
            RED.nodes.createNode(this, config);
            var node = this;
            this.on('input', function (msg) {
                var params = [];
                var api = NetatmoGetNetatmoObject(config, msg, node);

                var data = {};
                params.forEach(function(element) {
                    data[element] = msg[element] ? msg[element] : config[element];
                    if(!data[element]) delete data[element];
                })
                api.dropWebhook(data, function (err, data) {
                    msg.payload = data;
                    node.send(msg);
                });
            });
        }
    }
    RED.nodes.registerType("drop webhook",NetatmoDropWebhook);
}

