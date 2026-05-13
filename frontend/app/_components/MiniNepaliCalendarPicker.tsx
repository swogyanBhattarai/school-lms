// components/calendar/mini-calendar.tsx
"use client";
import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Calendar,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
import { cn } from "@/lib/utils";
import {
  NEPALI_MONTHS,
  NEPALI_WEEK_DAYS,
  ENGLISH_WEEK_DAYS,
  toNepaliNumber,
  getBSMonthDays,
  getBSMonthStartDay,
  getTodayBS,
  convertBSToAD,
  convertADToBS,
  formatBSDate,
} from "@/lib/nepali-calendar";
import React from "react";

interface MiniCalendarProps {
  value?: { year: number; month: number; day: number };
  onChange?: (date: { year: number; month: number; day: number }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MiniCalendar({
  value,
  onChange,
  placeholder = "Select date",
  className,
  disabled = false,
}: MiniCalendarProps) {
  const today = getTodayBS();
  const [open, setOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(value?.year || today.year);
  const [currentMonth, setCurrentMonth] = useState(value?.month || today.month);
  const [selectedDate, setSelectedDate] = useState<
    { year: number; month: number; day: number } | null
  >(value || null);
  const [showAD, setShowAD] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setCurrentYear(value.year);
      setCurrentMonth(value.month);
    }
  }, [value]);

  const monthDays = getBSMonthDays(currentYear, currentMonth);
  const startDay = getBSMonthStartDay(currentYear, currentMonth);
  const weekDays = showAD ? ENGLISH_WEEK_DAYS : NEPALI_WEEK_DAYS;

  // Generate year range (current year ± 10 years)
  const yearRange = useMemo(() => {
    const years = [];
    const startYear = showAD 
      ? convertBSToAD(currentYear, currentMonth, 1).getUTCFullYear() - 10
      : currentYear - 10;
    const endYear = showAD 
      ? convertBSToAD(currentYear, currentMonth, 1).getUTCFullYear() + 10
      : currentYear + 10;
    
    for (let y = startYear; y <= endYear; y++) {
      years.push(y);
    }
    return years;
  }, [currentYear, showAD]);

  // Get AD months for BS month selector
  const adMonthsForYear = useMemo(() => {
    if (!showAD) return [];
    
    const months = [];
    for (let m = 0; m < 12; m++) {
      const adDate = convertBSToAD(currentYear, m, 1);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      months.push({
        bsMonth: m,
        label: `${NEPALI_MONTHS[m]} (${monthNames[adDate.getUTCMonth()]})`,
      });
    }
    return months;
  }, [currentYear, showAD]);

  const calendarGrid = useMemo(() => {
    const grid: (number | null)[] = [];
    for (let i = 0; i < startDay; i++) {
      grid.push(null);
    }
    for (let day = 1; day <= monthDays; day++) {
      grid.push(day);
    }
    while (grid.length % 7 !== 0) {
      grid.push(null);
    }
    return grid;
  }, [monthDays, startDay]);

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day: number) => {
    const date = { year: currentYear, month: currentMonth, day };
    setSelectedDate(date);
    onChange?.(date);
    setOpen(false);
  };

  const handleYearSelect = (year: number) => {
    if (showAD) {
      // Convert selected AD year back to BS
      const adDate = new Date(Date.UTC(year, 0, 1));
      const bsDate = convertADToBS(adDate);
      setCurrentYear(bsDate.year);
      // Keep the same month if possible
      setCurrentMonth(Math.min(bsDate.month, 11));
    } else {
      setCurrentYear(year);
    }
    setShowYearSelector(false);
  };

  const handleMonthSelect = (month: number) => {
    setCurrentMonth(month);
    setShowMonthSelector(false);
  };

  const isToday = (day: number): boolean => {
    return (
      currentYear === today.year &&
      currentMonth === today.month &&
      day === today.day
    );
  };

  const isSelected = (day: number): boolean => {
    return (
      selectedDate !== null &&
      currentYear === selectedDate.year &&
      currentMonth === selectedDate.month &&
      day === selectedDate.day
    );
  };

  // Get AD day number for a BS day in the current month
  const getADDay = (bsDay: number): number => {
    const adDate = convertBSToAD(currentYear, currentMonth, bsDay);
    return adDate.getUTCDate();
  };

  // Get formatted display value for the trigger button
  const getDisplayValue = () => {
    if (!selectedDate) return null;
    
    if (showAD) {
      const adDate = convertBSToAD(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[adDate.getUTCMonth()]} ${adDate.getUTCDate()}, ${adDate.getUTCFullYear()}`;
    } else {
      return formatBSDate(
        selectedDate.year,
        selectedDate.month,
        selectedDate.day
      );
    }
  };

  // Get the AD month/year for header display
  const getADHeaderDate = () => {
    const firstDayAD = convertBSToAD(currentYear, currentMonth, 1);
    const lastDayAD = convertBSToAD(currentYear, currentMonth, monthDays);
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const startMonth = months[firstDayAD.getUTCMonth()];
    const endMonth = months[lastDayAD.getUTCMonth()];
    const year = lastDayAD.getUTCFullYear();
    
    if (startMonth !== endMonth) {
      return `${startMonth} / ${endMonth} ${year}`;
    }
    
    return `${startMonth} ${year}`;
  };

  // Get current display year for the header
  const getDisplayYear = () => {
    if (showAD) {
      const adDate = convertBSToAD(currentYear, currentMonth, 1);
      return adDate.getUTCFullYear();
    }
    return currentYear;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
          {selectedDate ? (
            <span className={cn(!showAD && "font-noto-devanagari", "truncate")}>
              {getDisplayValue()}
            </span>
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3 min-w-[300px]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                previousMonth();
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {/* Month Selector */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMonthSelector(!showMonthSelector);
                  setShowYearSelector(false);
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted transition-colors text-sm font-medium"
              >
                {showAD 
                  ? getADHeaderDate().split(" ")[0].replace(" / ", "/")
                  : NEPALI_MONTHS[currentMonth]
                }
                <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
              </button>
              
              {/* Year Selector */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowYearSelector(!showYearSelector);
                  setShowMonthSelector(false);
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted transition-colors text-sm font-medium"
              >
                {showAD ? getDisplayYear() : toNepaliNumber(currentYear)}
                <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAD(!showAD);
                }}
                title={showAD ? "Switch to Bikram Sambat" : "Switch to Gregorian"}
              >
                <Globe className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  nextMonth();
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Month Selector Dropdown */}
          {showMonthSelector && (
            <div className="grid grid-cols-3 gap-1 animate-in fade-in-0 zoom-in-95">
              {(showAD ? adMonthsForYear : NEPALI_MONTHS.map((name, idx) => ({ bsMonth: idx, label: name })))
                .map((item) => (
                  <button
                    key={item.bsMonth}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMonthSelect(item.bsMonth);
                    }}
                    className={cn(
                      "px-2 py-1.5 text-xs rounded-md transition-colors",
                      "hover:bg-muted",
                      currentMonth === item.bsMonth && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
            </div>
          )}

          {/* Year Selector Dropdown */}
          {showYearSelector && (
            <div className="max-h-[200px] overflow-y-auto grid grid-cols-3 gap-1 animate-in fade-in-0 zoom-in-95 border rounded-md p-2">
              {yearRange.map((year) => (
                <button
                  key={year}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleYearSelect(year);
                  }}
                  className={cn(
                    "px-2 py-1.5 text-xs rounded-md transition-colors",
                    "hover:bg-muted",
                    (showAD ? getDisplayYear() : currentYear) === year && 
                    "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <span className={!showAD ? "font-noto-devanagari" : ""}>
                    {showAD ? year : toNepaliNumber(year)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Week Days */}
          {!showMonthSelector && !showYearSelector && (
            <>
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs text-muted-foreground py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarGrid.map((bsDay, index) => {
                  if (bsDay === null) {
                    return <div key={`empty-${index}`} className="h-8 w-8" />;
                  }

                  const displayDay = showAD ? getADDay(bsDay) : bsDay;

                  return (
                    <button
                      key={`day-${bsDay}`}
                      onClick={() => handleDateSelect(bsDay)}
                      className={cn(
                        "h-8 w-8 rounded-md text-sm flex items-center justify-center",
                        "hover:bg-muted transition-colors",
                        isToday(bsDay) && "bg-primary/10 font-bold",
                        isSelected(bsDay) && "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      <span className={!showAD ? "font-noto-devanagari text-xs" : "text-xs"}>
                        {showAD ? displayDay : toNepaliNumber(displayDay)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => {
                    setCurrentYear(today.year);
                    setCurrentMonth(today.month);
                    handleDateSelect(today.day);
                  }}
                >
                  Today
                </Button>
                {selectedDate && (
                  <span className="text-xs text-muted-foreground">
                    {showAD
                      ? (() => {
                          const adDate = convertBSToAD(
                            selectedDate.year,
                            selectedDate.month,
                            selectedDate.day
                          );
                          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                                          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                          return `${months[adDate.getUTCMonth()]} ${adDate.getUTCDate()}`;
                        })()
                      : formatBSDate(
                          selectedDate.year,
                          selectedDate.month,
                          selectedDate.day
                        )}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}