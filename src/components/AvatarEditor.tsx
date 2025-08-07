import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, FabricImage, util } from "fabric";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RotateCcw, RotateCw, Move, ZoomIn, ZoomOut, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AvatarEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageData: string) => void;
  imageUrl: string;
}

export function AvatarEditor({ isOpen, onClose, onSave, imageUrl }: AvatarEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [zoom, setZoom] = useState([1]);
  const [rotation, setRotation] = useState([0]);
  const { toast } = useToast();

  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 400,
      height: 400,
      backgroundColor: "#f8f9fa",
    });

    setFabricCanvas(canvas);

    // Load image when dialog opens
    if (imageUrl) {
      util.loadImage(imageUrl).then((img) => {
        const fabricImage = new FabricImage(img, {
          left: 200,
          top: 200,
          originX: 'center',
          originY: 'center',
          scaleX: 0.5,
          scaleY: 0.5,
        });
        
        canvas.add(fabricImage);
        canvas.setActiveObject(fabricImage);
        canvas.renderAll();
      });
    }

    return () => {
      canvas.dispose();
    };
  }, [isOpen, imageUrl]);

  useEffect(() => {
    if (!fabricCanvas) return;
    
    const activeObject = fabricCanvas.getActiveObject();
    if (activeObject) {
      activeObject.set({
        scaleX: zoom[0],
        scaleY: zoom[0],
        angle: rotation[0],
      });
      fabricCanvas.renderAll();
    }
  }, [zoom, rotation, fabricCanvas]);

  const handleSave = () => {
    if (!fabricCanvas) return;

    // Create a circular crop area
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = 256;
    cropCanvas.height = 256;
    const cropCtx = cropCanvas.getContext('2d');
    
    if (cropCtx) {
      // Create circular clipping path
      cropCtx.beginPath();
      cropCtx.arc(128, 128, 128, 0, Math.PI * 2);
      cropCtx.clip();

      // Draw the fabric canvas content
      const fabricCanvasElement = fabricCanvas.getElement();
      cropCtx.drawImage(
        fabricCanvasElement,
        0, 0, 400, 400,
        0, 0, 256, 256
      );

      const imageData = cropCanvas.toDataURL('image/png');
      onSave(imageData);
      toast({
        title: "Avatar atualizado!",
        description: "Sua nova imagem foi salva com sucesso.",
      });
    }
    
    onClose();
  };

  const resetImage = () => {
    setZoom([1]);
    setRotation([0]);
    
    if (fabricCanvas) {
      const activeObject = fabricCanvas.getActiveObject();
      if (activeObject) {
        activeObject.set({
          left: 200,
          top: 200,
          scaleX: 0.5,
          scaleY: 0.5,
          angle: 0,
        });
        fabricCanvas.renderAll();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Move className="h-5 w-5 text-white" />
            </div>
            Editor de Avatar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Canvas */}
          <div className="flex justify-center">
            <div className="relative">
              <canvas 
                ref={canvasRef} 
                className="border-2 border-dashed border-primary/30 rounded-lg"
              />
              {/* Circular overlay to show crop area */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full relative">
                  <div 
                    className="absolute border-4 border-primary rounded-full shadow-lg"
                    style={{
                      width: '200px',
                      height: '200px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Zoom */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <ZoomIn className="h-4 w-4" />
                Zoom: {zoom[0].toFixed(1)}x
              </Label>
              <Slider
                value={zoom}
                onValueChange={setZoom}
                min={0.1}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Rotation */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                Rotação: {rotation[0]}°
              </Label>
              <Slider
                value={rotation}
                onValueChange={setRotation}
                min={-180}
                max={180}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={resetImage}
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetar
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-primary hover:opacity-90"
            >
              <Check className="h-4 w-4 mr-2" />
              Salvar Avatar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}