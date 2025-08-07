import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function SettingsButton() {
  const navigate = useNavigate();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => navigate("/settings")}
      className="relative"
    >
      <Settings className="h-5 w-5" />
    </Button>
  );
}