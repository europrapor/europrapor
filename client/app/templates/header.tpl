<nav class="navbar navbar-default" role="navigation">
  <!-- Brand and toggle get grouped for better mobile display -->
  <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">Europrapor</a>
  </div>

  <!-- Collect the nav links, forms, and other content for toggling -->
  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Maps <b class="caret"></b></a>
        <ul class="dropdown-menu">
        <li><a href="#/map">Density map</a></li>
        <li class="divider"></li>
        <% _.each(maps, function (map) {
            var name = map.map_id.charAt(0).toUpperCase() + map.map_id.slice(1); %>
          <li><a href="<% print('#/maps/' + map.map_id) %>"><%= name %></a></li>
        <% }); %>
        </ul>
      </li>
    </ul>
  </div><!-- /.navbar-collapse -->
</nav>
