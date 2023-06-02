var customFabric = {

    canvas: {},

    Initialize: function (canvasId) {

        this.canvas = new fabric.Canvas(canvasId);

        window.addEventListener('resize', this.OnResize, false);

        this.OnResize();

        this.LoadZoomAndPanning();
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
