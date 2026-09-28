#include <string>
struct Weather{std::string city;double temperature;int humidity;double wind;};
std::string summary(const Weather&w){return w.city+": "+std::to_string(w.temperature)+" C";}
