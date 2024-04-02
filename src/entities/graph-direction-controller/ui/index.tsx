import { DirectionType } from "../../../model/dummy";

const DIRECTION_LIST: DirectionType[] = ["RIGHT", "LEFT", "UP", "DOWN"];

export default function GraphDirectionController({
  direction,
  onChange,
}: {
  direction: DirectionType;
  onChange: (direction: DirectionType) => void;
}) {
  return (
    <div>
      {DIRECTION_LIST.map((d, index) => (
        <div key={d}>
          <input
            type="radio"
            id={`direction-${index}`}
            name="direction"
            value={d}
            checked={direction === d}
            onChange={() => onChange(d)}
          />
          <label htmlFor={`direction-${index}`}>{d}</label>
        </div>
      ))}
    </div>
  );
}
