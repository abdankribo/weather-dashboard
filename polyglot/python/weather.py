from dataclasses import dataclass
@dataclass
class Weather:
    city:str; temperature:float; humidity:int; wind:float

def summary(w): return f"{w.city}: {w.temperature:.1f}°C, humidity {w.humidity}%, wind {w.wind:.1f} km/h"
