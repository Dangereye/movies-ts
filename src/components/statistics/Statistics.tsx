import HDiv from "../typography/HDiv";
type StatisticsProps<T> = { data: T };

export default function Statistics<T>({ data }: StatisticsProps<T>) {
  return (
    <div className="statistics">
      <div className="status">
        {/* <HDiv variant="heading--h2" heading={data} /> */}
      </div>
    </div>
  );
}
