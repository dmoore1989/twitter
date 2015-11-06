(function () {
  $.FollowToggle = function (el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    if (this.$el.data("initial-follow-state")) {
      this.followState = "followed";
    }  else {
      this.followState = "unfollowed";
    }

    this.render();
    this.handleClick();
  };

  $.FollowToggle.prototype.render = function () {
    if (this.followState === "unfollowing" || this.followState == "following"){
      this.$el.attr("disabled", true);
    }
    if (this.followState === "followed") {
      var text = "Unfollow!"
    } else if (this.followState === "unfollowed") {
      var text = "Follow!";
    }
    this.$el.text(text);
  };

  $.FollowToggle.prototype.handleClick = function () {
    this.$el.on("click", function(event) {
      event.preventDefault();
      var type = (this.followState === "followed") ? "DELETE" : "POST"
      if (type === "DELETE") {
        this.followState = "unfollowing";
      } else {
        this.followState = "following";
      }
      var context = this;
      this.render();

      $.ajax({
        type: type,
        url: "/users/"+ context.userId + "/follow",
        dataType: "json",
        success: function(data){
          context.followState = (context.followState === "unfollowing") ? "unfollowed": "followed";
          context.render();
          context.$el.attr("disabled", false);
        },
        failure: function(data){
          console.log(data);
          context.render();
          context.$el.attr("disabled", false);
        }

      });
    }.bind(this));
  }

  $.fn.followToggle = function () {
    return this.each(function () {
      new $.FollowToggle(this);
    });
  };
}());
