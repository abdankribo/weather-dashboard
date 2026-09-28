package weather
import "fmt"
type Weather struct{City string; Temperature float64; Humidity int; Wind float64}
func Summary(w Weather) string{return fmt.Sprintf("%s: %.1f°C, humidity %d%%",w.City,w.Temperature,w.Humidity)}
