import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MapPin } from "lucide-react";

interface LocationPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locations: string[];
  selectedLocation: string;
  onLocationSelect: (location: string) => void;
  onAddLocation: (location: string) => void;
}

export function LocationPicker({
  open,
  onOpenChange,
  locations,
  selectedLocation,
  onLocationSelect,
  onAddLocation,
}: LocationPickerProps) {
  const [newLocation, setNewLocation] = useState("");
  const [showAddNew, setShowAddNew] = useState(false);

  const handleAddNew = () => {
    if (newLocation.trim()) {
      onAddLocation(newLocation.trim());
      onLocationSelect(newLocation.trim());
      setNewLocation("");
      setShowAddNew(false);
      onOpenChange(false);
    }
  };

  const handleSelect = (location: string) => {
    onLocationSelect(location);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4">
        <DialogHeader>
          <DialogTitle data-testid="text-location-title">Assign Location</DialogTitle>
          <DialogDescription>Select or create a storage location</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 py-2 max-h-64 overflow-y-auto">
          {locations.map((location) => (
            <button
              key={location}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left hover-elevate transition-colors ${
                selectedLocation === location
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50"
              }`}
              onClick={() => handleSelect(location)}
              data-testid={`button-location-${location.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="font-medium">{location}</span>
            </button>
          ))}
          
          {locations.length === 0 && !showAddNew && (
            <p className="text-muted-foreground text-center py-4 text-sm">
              No locations yet. Add your first one!
            </p>
          )}
        </div>

        {showAddNew ? (
          <div className="flex gap-2">
            <Input
              placeholder="Enter location name"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddNew()}
              autoFocus
              data-testid="input-new-location"
            />
            <Button onClick={handleAddNew} data-testid="button-save-location">
              Add
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => setShowAddNew(true)}
            data-testid="button-add-new-location"
          >
            <Plus className="h-4 w-4" />
            Add New Location
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
