// Generated by CoffeeScript 1.4.0
(function() {
  var Cell, Grid, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Cell = (function() {

    function Cell(r, coords) {
      this.unhovered = __bind(this.unhovered, this);

      this.hovered = __bind(this.hovered, this);

      this.doClick = __bind(this.doClick, this);

      var _ref;
      _ref = [r, coords.x, coords.y], this.r = _ref[0], this.x = _ref[1], this.y = _ref[2];
      this.colors = {
        "bright": "#AAAAAA",
        "dim": "#8d9794",
        "blue": "#1e725b",
        "bright-blue": "#3f947d"
      };
      this.clicked = false;
      this.draw();
    }

    Cell.prototype.path = function() {
      return "m0,0 -15.373745,26.6281 -30.74749,0 -15.373745,-26.6281 15.373745,-26.6281 30.74749,0 z";
    };

    Cell.prototype.draw = function() {
      this.drawCell();
      return this.attachHandlers();
    };

    Cell.prototype.drawCell = function() {
      this.cell = this.r.path(this.path());
      this.cell.attr({
        "fill": this.colors['dim'],
        "stroke-width": 2,
        "stroke": "#5f6664"
      });
      return this.cell.transform("t" + this.x + "," + this.y + "s1");
    };

    Cell.prototype.changeColor = function(c) {
      return this.cell.attr({
        "fill": this.colors[c]
      });
    };

    Cell.prototype.doClick = function() {
      this.clicked = !this.clicked;
      return this.hovered();
    };

    Cell.prototype.hovered = function() {
      this.cell.toFront();
      if (this.clicked) {
        this.changeColor('bright-blue');
      } else {
        this.changeColor('bright');
      }
      return this.cell.animate({
        transform: "t" + this.x + "," + this.y + "s1.2"
      }, 1000, 'bounce');
    };

    Cell.prototype.unhovered = function() {
      if (this.clicked) {
        this.changeColor('blue');
      } else {
        this.changeColor('dim');
      }
      return this.cell.animate({
        transform: "t" + this.x + "," + this.y + "s1"
      }, 1000, 'bounce');
    };

    Cell.prototype.attachHandlers = function() {
      this.cell.hover(this.hovered, this.unhovered);
      return this.cell.click(this.doClick);
    };

    return Cell;

  })();

  Grid = (function() {

    function Grid(divId, width, height) {
      var _ref, _ref1;
      _ref = [divId, width, height], this.divId = _ref[0], this.width = _ref[1], this.height = _ref[2];
      _ref1 = [50, 58], this.cellWidth = _ref1[0], this.cellHeight = _ref1[1];
      this.r = Raphael(this.divId, this.width, this.height);
      this.draw();
    }

    Grid.prototype.cols = function() {
      return Math.ceil(this.width / this.cellWidth);
    };

    Grid.prototype.rows = function() {
      return Math.ceil(this.height / this.cellHeight);
    };

    Grid.prototype.getCellCoords = function(col, row) {
      var even;
      even = col % 2;
      return {
        x: col * this.cellWidth,
        y: row * this.cellHeight + this.cellHeight * even * 0.5
      };
    };

    Grid.prototype.draw = function() {
      var col, row, _i, _ref, _results;
      _results = [];
      for (row = _i = 0, _ref = this.rows(); 0 <= _ref ? _i <= _ref : _i >= _ref; row = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref1, _results1;
          _results1 = [];
          for (col = _j = 0, _ref1 = this.cols(); 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; col = 0 <= _ref1 ? ++_j : --_j) {
            _results1.push(new Cell(this.r, this.getCellCoords(col, row)));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return Grid;

  })();

  this.Hexagrid = (_ref = window.Hexagrid) != null ? _ref : {};

  this.Hexagrid.Cell = Cell;

  this.Hexagrid.Grid = Grid;

  jQuery(function() {
    var _ref1;
    this.Hexagrid = (_ref1 = window.Hexagrid) != null ? _ref1 : {};
    this.Hexagrid.grid = new this.Hexagrid.Grid('hexagrid', $(window).width(), $(window).height());
    return $(window).resize(this.Hexagrid.grid.reDraw());
  });

}).call(this);
