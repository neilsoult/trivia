import { Result } from './result';
import { ShapedData } from './shaped-data';

export interface Team {
    name: string;
    results: Result[];
    shapedData?: ShapedData;
    teamId: string;
}
