const Vueapp = {
    data() {
        return {
            windows: [
                {
                    id: "info",
                    name: "介绍",
                },
            ],
            counter: 0,
            longest: 10,
        };
    },
    methods: {
        totop(id) {
            item = $(id);
            this.longest++;
            $(this).css("z-index", this.longest);
            $("#footer").css("z-index", this.longest + 10);
        },
        changepage(id) {
            item = $(id);
            if (item.is(":hidden")) {
                item.show();
                this.totop(id);
            } else {
                if (item.attr("big") == 1) {
                    bigpage(item, 0);
                }
                item.hide();
            }
        },
        bigpage(id, mode) {
            item = $("#" + id);
            if (item.attr("big") === "0") {
                $(".head").css("border-radius", "0");
                item.attr("w", item.css("width"));
                item.attr("h", item.css("height"));
                item.attr("t", item.css("top"));
                item.attr("l", item.css("left"));
                item.css({
                    "border-radius": "0",
                    width: "100%",
                    height: "100%",
                    top: "0",
                    left: "0",
                });
                item.draggable({
                    distance: 5,
                    start: () => {
                        this.bigpage(id, 1);
                    },
                    stop: () => {
                        item.draggable({
                            distance: 5,
                            start: undefined,
                        });
                    },
                });
                $(".windowsmenu").animate({ top: "+=40px" });
                item.attr("big", 1);
            } else if (mode === 0) {
                $(".head").css("border-radius", "5px 5px 0px 0px");
                item.css({
                    "border-radius": "7px 7px 5px 5px",
                    width: item.attr("w"),
                    height: item.attr("h"),
                    top: item.attr("t"),
                    left: item.attr("l"),
                });
                item.attr("big", 0);
                item.draggable({
                    distance: 5,
                    start: undefined,
                    stop: undefined,
                });
                $(".windowsmenu").animate({ top: "+=-40px" });
            } else {
                $(".head").css("border-radius", "5px 5px 0px 0px");
                item.css({
                    "border-radius": "7px 7px 5px 5px",
                    width: item.attr("w"),
                    height: item.attr("h"),
                });
                item.attr("big", 0);
                item.draggable({ distance: 0 });
                $(".windowsmenu").animate({ top: "+=40px" });
            }
        },
        $: window.$,
    },
};

Vue.createApp(Vueapp).mount("#app");

window.$(".window").each(function () {
    window.$(this).draggable({
        distance: 5,
    });
});
