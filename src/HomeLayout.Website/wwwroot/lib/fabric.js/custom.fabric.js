var customFabric = {

    canvas: {},
    snapToGridSize: 5,

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
        customFabric.canvas.setHeight(window.innerHeight);
        customFabric.canvas.setWidth(window.innerWidth);
        customFabric.canvas.renderAll();
    },

    Map: function (fabricObject, drawing) {
        fabricObject.id = drawing.id;
        fabricObject.styleId = drawing.styleId;
    },

    ToggleEdit: function (enabled) {

        if (enabled) {
            for (var i = 0; i < (window.innerWidth / customFabric.snapToGridSize); i++) {
                this.canvas.add(new fabric.Line([i * customFabric.snapToGridSize, 0, i * customFabric.snapToGridSize, window.innerWidth], {
                    stroke: '#FFF',
                    opacity: 0,
                    selectable: false,
                    excludeFromExport: true
                }));
                this.canvas.add(new fabric.Line([0, i * customFabric.snapToGridSize, window.innerWidth, i * customFabric.snapToGridSize], {
                    stroke: '#FFF',
                    opacity: 0,
                    selectable: false,
                    excludeFromExport: true
                }))
            }
        } else {
            var objects = customFabric.canvas.getObjects('line');
            for (let i in objects) {
                customFabric.canvas.remove(objects[i]);
            }
            customFabric.canvas.renderAll();
        }

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
        this.canvas.on('object:moving', function (options) {
            if (Math.round(options.target.left / customFabric.snapToGridSize * 4) % 4 == 0 && Math.round(options.target.top / customFabric.snapToGridSize * 4) % 4 == 0) {
                options.target.set({
                    left: Math.round(options.target.left / customFabric.snapToGridSize) * customFabric.snapToGridSize,
                    top: Math.round(options.target.top / customFabric.snapToGridSize) * customFabric.snapToGridSize
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
                        zoomStartScale = customFabric.canvas.getZoom();
                    }
                    var delta = zoomStartScale * e.self.scale;
                    customFabric.canvas.zoomToPoint(point, delta);
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
                        customFabric.canvas.relativePan(delta);
                    }

                    lastX = e.self.x;
                    lastY = e.self.y;
                }
            },
            'mouse:wheel': function (opt) {
                var delta = opt.e.deltaY;
                var zoom = customFabric.canvas.getZoom();
                zoom *= 0.999 ** delta;
                if (zoom > 20) zoom = 20;
                if (zoom < 0.01) zoom = 0.01;
                customFabric.canvas.setZoom(zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            },
            'mouse:down': function (opt) {
                var evt = opt.e;
                if (evt.ctrlKey === true) {
                    this.isDragging = true;
                    this.selection = false;
                    this.lastPosX = evt.clientX;
                    this.lastPosY = evt.clientY;
                }
            },
            'mouse:move': function (opt) {
                if (this.isDragging) {
                    var e = opt.e;
                    var vpt = this.viewportTransform;
                    vpt[4] += e.clientX - this.lastPosX;
                    vpt[5] += e.clientY - this.lastPosY;
                    this.requestRenderAll();
                    this.lastPosX = e.clientX;
                    this.lastPosY = e.clientY;
                }
            },
            'mouse:up': function(opt) {
                // on mouse up we want to recalculate new interaction
                // for all objects, so we call setViewportTransform
                this.setViewportTransform(this.viewportTransform);
                this.isDragging = false;
                this.selection = true;
            }
        });
    }
}
