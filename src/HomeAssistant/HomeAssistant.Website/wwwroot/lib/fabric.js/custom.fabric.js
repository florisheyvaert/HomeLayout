var customFabric = {

    canvas: {},

    Initialize: function (canvasId) {

        this.canvas = new fabric.Canvas(canvasId);

        window.addEventListener('resize', this.OnResize, false);

        this.OnResize();

        var circle = new fabric.Circle({
            radius: 50,
            fill: 'green',
            stroke: 'green',
        });

        this.canvas.add(circle);
    },

    AddRect: function (left, top, width, height, fill) {

        var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });

        this.canvas.add(rect);
    },

    AddDrawing: function (drawing) {

        var fabricObject;

        console.log(drawing);

        if (drawing.type == "rect") {
            fabricObject = new fabric.Rect(drawing);
        } else if (drawing.type == "circle") {
            fabricObject = new fabric.Circle(drawing);
        } else if (drawing.type == "triangle") {
            fabricObject = new fabric.Triangle(drawing);
        }

        if (fabricObject) {
            this.canvas.add(fabricObject);
        }

    },

    OnResize: function() {
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.renderAll();
    }
}