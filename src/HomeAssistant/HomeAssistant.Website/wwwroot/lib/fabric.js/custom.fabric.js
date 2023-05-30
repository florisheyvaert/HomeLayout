var customFabric = {

    canvas: {},

    Initialize: function (canvasId) {

        this.canvas = new fabric.Canvas(canvasId);

        window.addEventListener('resize', this.OnResize, false);

        this.OnResize();
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

    OnResize: function() {
        this.canvas.setHeight(window.innerHeight);
        this.canvas.setWidth(window.innerWidth);
        this.canvas.renderAll();
    }
}