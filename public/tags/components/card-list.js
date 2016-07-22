riot.tag2('card-list', '<div class="card card-small" data-uid="{id}"> <div class="card-title {color} lighten-1"> <a href="#new-card-{id}" class="add-card-modal-trigger"> <i class="small material-icons add-button">add</i></a> <span class="list-title">{name}</span> </div> <div class="action-card-container blue-grey lighten-5" data-uid="{id}"> <action-card class="card-content" each="{cards}" data-uid="{this.id}"></action-card> </div> </div> <add-card-modal uid="{id}"></add-card-modal>', '', 'class="col s3 blue-grey lighten-5 card-list data-uid={id}"', function(opts) {
        var self = this;

        var colors = [
            "red", "green", "blue", "yellow", "orange", "purple"
        ];

        this.color = colors[app.randomIntFromInterval(0, 5)];

        this.addCard = function(data) {
            data.position = this.cards.length;
            data["card_group_id"] = this.id;
            var site = fermata.json("")(['cards']).post(data, function (err, resp) {
                if (!err) {
                    self.cards.push(resp);
                    self.update();
                }
            });

        }.bind(this);

        this.on('mount', function () {
            var el = this.root.querySelector(".action-card-container")
            var sortable = Sortable.create(el, {
                group: "group-org",
                onAdd: function (evt) {
                    var data = {
                        id: evt.item.dataset.uid,
                        fromIndex: evt.oldIndex,
                        toIndex: evt.newIndex,
                        fromGroupId: evt.from.dataset.uid,
                        toGroupId: evt.to.dataset.uid
                    };
                    var site = fermata.json("")(['cards'])(data.id)(['move']).put(data, function (err, resp) {
                    });

                },

                onUpdate: function (evt) {
                    var data = {
                        id: evt.item.dataset.uid,
                        oldIndex: evt.oldIndex,
                        newIndex: evt.newIndex,
                        cardGroupId: self.id
                    };
                    var site = fermata.json("")(['cards'])(data.id)(['re-arrange']).put(data, function (err, resp) {
                    });
                },

            });
        })
});