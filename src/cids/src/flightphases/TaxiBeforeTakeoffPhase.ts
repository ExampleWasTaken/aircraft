import { FlightPhase } from './FlightPhase';

/**
 * Possible next flight phases:
 * 1. TAKEOFF AND INITIAL CLIMB
 * 2. DISEMBARKATION
 */
export class TaxiBeforeTakeoffPhase extends FlightPhase {
    private nextFlightPhases: FlightPhase[];

    public init(...flightPhases: FlightPhase[]) {
        this.nextFlightPhases = flightPhases;
    }

    public tryTransition(): void {
        this.nextFlightPhases.forEach((current) => {
            if (current.shouldActivate()) {
                this.sendNewFlightPhaseToManager(current);
            }
        });
    }

    public shouldActivate(): boolean {
        return (
            this.flightPhaseManager.dir.onGround
            && this.flightPhaseManager.dir.groundSpeed > 0
            && this.flightPhaseManager.dir.allDoorsClosedLocked
            && this.flightPhaseManager.dir.thrustLever1Position < 75
            && this.flightPhaseManager.dir.thrustLever2Position < 75
        );
    }

    public getValue(): number {
        return 3;
    }
}
