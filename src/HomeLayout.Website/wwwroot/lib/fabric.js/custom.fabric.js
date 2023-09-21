var customFabric = {

    canvas: {},

    Initialize: function (canvasId) {

        this.canvas = new fabric.Canvas(canvasId, {
            selection: false
        });

        window.addEventListener('resize', this.OnResize, false);

        this.OnResize();

        this.LoadZoomAndPanning();

        this.SnapToGrid();
    },

    AddDrawing: function (drawing) {

        var fabricObject;

        if (drawing.type == "rect") {
            fabricObject = new fabric.Rect(drawing);
        } else if (drawing.type == "circle") {
            fabricObject = new fabric.Circle(drawing);
        } else if (drawing.type == "triangle") {
            fabricObject = new fabric.Triangle(drawing);
        }

        fabricObject.toObject = (function (toObject) {
            return function () {
                return fabric.util.object.extend(toObject.call(this), {
                    id: this.id,
                    styleId: this.styleId
                });
            };
        })(fabricObject.toObject);

        if (fabricObject) {
            this.Map(fabricObject, drawing);
            this.canvas.add(fabricObject);
        }

        console.log(drawing);
        //console.log(JSON.stringify(this.canvas));
    },

    ExportJson: function () {
        console.log(JSON.stringify(this.canvas));
        return JSON.stringify(this.canvas);
    },

    ImportJson: function (json) {
        this.canvas.loadFromJSON(json);
    },

    OnResize: function () {
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.renderAll();
    },

    Map: function (fabricObject, drawing) {
        fabricObject.id = drawing.id;
        fabricObject.styleId = drawing.styleId;
    },

    ToggleEdit: function (enabled) {

        this.canvas.forEachObject(function (object) {
            object.selectable = enabled;

            if (object.type == "line") {
                object.selectable = false;
                object.opacity = enabled ? 0.25 : 0;
            }

        });

        if (!enabled) {
            this.canvas.discardActiveObject();
        }

        this.canvas.renderAll();
    },

    SnapToGrid: function () {

        var grid = 20;

        for (var i = 0; i < (window.innerWidth / grid); i++) {
            this.canvas.add(new fabric.Line([i * grid, 0, i * grid, window.innerWidth], {
                stroke: '#FFF',
                opacity: 0,
                selectable: false,
                excludeFromExport: true
            }));
            this.canvas.add(new fabric.Line([0, i * grid, window.innerWidth, i * grid], {
                stroke: '#FFF',
                opacity: 0,
                selectable: false,
                excludeFromExport: true
            }))
        }

        this.canvas.on('object:moving', function (options) {
            if (Math.round(options.target.left / grid * 4) % 4 == 0 && Math.round(options.target.top / grid * 4) % 4 == 0) {
                options.target.set({
                    left: Math.round(options.target.left / grid) * grid,
                    top: Math.round(options.target.top / grid) * grid
                }).setCoords();
            }
        });
    },

    LoadZoomAndPanning: function () {
        this.canvas.on({
            'touch:gesture': function (e) {
                if (e.e.touches && e.e.touches.length == 2) {
                    pausePanning = true;
                    var point = new fabric.Point(e.self.x, e.self.y);
                    if (e.self.state == "start") {
                        zoomStartScale = canvas.getZoom();
                    }
                    var delta = zoomStartScale * e.self.scale;
                    canvas.zoomToPoint(point, delta);
                    pausePanning = false;
                }
            },
            'object:selected': function () {
                pausePanning = true;
            },
            'selection:cleared': function () {
                pausePanning = false;
            },
            'touch:drag': function (e) {
                if (pausePanning == false && undefined != e.self.x && undefined != e.self.x) {
                    currentX = e.self.x;
                    currentY = e.self.y;
                    xChange = currentX - lastX;
                    yChange = currentY - lastY;

                    if ((Math.abs(currentX - lastX) <= 50) && (Math.abs(currentY - lastY) <= 50)) {
                        var delta = new fabric.Point(xChange, yChange);
                        canvas.relativePan(delta);
                    }

                    lastX = e.self.x;
                    lastY = e.self.y;
                }
            }
        });
    }
}
