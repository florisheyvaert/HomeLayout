var customFabric = {

    canvas: {},

    Initialize: function (canvasId) {

        this.canvas = new fabric.Canvas(canvasId);

        window.addEventListener('resize', this.OnResize, false);

        this.OnResize();
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
    }
}