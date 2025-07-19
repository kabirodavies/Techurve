import { Cpu, Database, Monitor, Shield, Zap, Wifi, Globe, Settings, Clock, Wrench } from "lucide-react";

// Centralized icon map for product features
// Use these keys as feature IDs in Sanity for consistent icon mapping
export const featureIconMap: Record<string, React.ElementType> = {
  processor: Cpu,
  memory: Database,
  storage: Database,
  display: Monitor,
  touch: Monitor,
  security: Shield,
  performance: Zap,
  connectivity: Wifi,
  data: Database,
  remote: Globe,
  configuration: Settings,
  time: Clock,
  installation: Wrench,
  // Add more mappings as needed
}; 




