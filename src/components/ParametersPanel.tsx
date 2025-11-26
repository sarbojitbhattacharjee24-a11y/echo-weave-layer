import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Sliders } from 'lucide-react';

interface ParametersPanelProps {
  temperature: number;
  maxTokens: number;
  topP: number;
  onTemperatureChange: (value: number) => void;
  onMaxTokensChange: (value: number) => void;
  onTopPChange: (value: number) => void;
}

export const ParametersPanel = ({
  temperature,
  maxTokens,
  topP,
  onTemperatureChange,
  onMaxTokensChange,
  onTopPChange,
}: ParametersPanelProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">Parameters</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="temperature" className="text-sm">Temperature</Label>
            <span className="text-sm text-muted-foreground">{temperature.toFixed(2)}</span>
          </div>
          <Slider
            id="temperature"
            min={0}
            max={2}
            step={0.1}
            value={[temperature]}
            onValueChange={([value]) => onTemperatureChange(value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Controls randomness. Lower is more focused, higher is more creative.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="max-tokens" className="text-sm">Max Tokens</Label>
            <span className="text-sm text-muted-foreground">{maxTokens}</span>
          </div>
          <Slider
            id="max-tokens"
            min={100}
            max={4096}
            step={100}
            value={[maxTokens]}
            onValueChange={([value]) => onMaxTokensChange(value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Maximum length of the generated response.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="top-p" className="text-sm">Top P</Label>
            <span className="text-sm text-muted-foreground">{topP.toFixed(2)}</span>
          </div>
          <Slider
            id="top-p"
            min={0}
            max={1}
            step={0.05}
            value={[topP]}
            onValueChange={([value]) => onTopPChange(value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Nucleus sampling. Lower values make output more focused.
          </p>
        </div>
      </div>
    </div>
  );
};
