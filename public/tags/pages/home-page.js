riot.tag2('home-page', '<trello-header></trello-header> <div class="master-container"> <div class="row card-list-container"> <card-list each="{opts.lists}"></card-list> </div> </div> <add-list-modal></add-list-modal> <footer-button></footer-button>', '', '', function(opts) {
        var self = this;
        this.on("mount", function () {
            $('.add-card-modal-trigger').leanModal();
            setWidth();
        });

        function setWidth() {
            var width = 500* (opts.lists.length);
            $(".card-list-container").css("width", width + "px")
        }

        this.addList = function(name)   {
            setWidth();
            self.update();
            var details = {
                name: name
            };
            var site = fermata.json("")(['card-groups']).post(details, function (err, resp) {
                resp.cards = [];
                opts.lists.push(resp);
                self.update();
                $('.add-card-modal-trigger').leanModal();
            });
        }.bind(this)
});