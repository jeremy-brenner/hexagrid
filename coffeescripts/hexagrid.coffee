
class Cell
  constructor: (r,coords) ->
    [ @r, @x, @y ] = [ r, coords.x, coords.y ]
    @colors =
      "bright": "#AAAAAA"
      "dim": "#8d9794"
      "blue": "#1e725b"
      "bright-blue": "#3f947d"
    @clicked = false
    @draw()
  path: ->
    "m0,0 -15.373745,26.6281 -30.74749,0 -15.373745,-26.6281 15.373745,-26.6281 30.74749,0 z" 
  draw: ->
    @drawCell()
    @attachHandlers()
  drawCell: ->
    @cell = @r.path @path()
    @cell.attr 
      "scale": 1
      "fill": @colors['dim']
      "stroke-width": 2
      "stroke": "#5f6664"
    @cell.translate @x, @y
    @cell.scale 1
  changeColor: (c) ->
    @cell.attr "fill": @colors[c]
  doClick: =>
    @clicked = not @clicked
    @hovered()
  hovered: =>
    if @clicked then @changeColor 'bright-blue' else @changeColor 'bright'
  unhovered: =>
    if @clicked then @changeColor 'blue' else @changeColor 'dim'
  attachHandlers: ->
    @cell.hover @hovered, @unhovered
    @cell.click @doClick
    
class Grid
  constructor: ( divId, width, height ) ->
    [ @divId, @width, @height ] = [ divId, width, height ]
    [ @cellWidth, @cellHeight ] = [ 50, 58 ]
    @r = Raphael @divId, @width, @height
    @draw()
  cols: ->
    Math.ceil @width / @cellWidth
  rows: -> 
    Math.ceil @height / @cellHeight
  getCellCoords: (col,row) ->
    even = col % 2
    x: col * @cellWidth
    y: row * @cellHeight + @cellHeight * even * 0.5 
  draw: -> 
    for row in [0..@rows()]
      for col in [0..@cols()]
        new Cell @r, @getCellCoords(col,row)
      
@Hexagrid = window.Hexagrid ? {}
@Hexagrid.Cell = Cell
@Hexagrid.Grid = Grid

jQuery ->
  @Hexagrid = window.Hexagrid ? {}
  @Hexagrid.grid = new @Hexagrid.Grid 'hexagrid', $(window).width(), $(window).height()
  