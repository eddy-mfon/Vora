export const generateSchedule = () => {
  const schedule = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Skip Sundays
    if (date.getDay() === 0) continue;

    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    
    // Generate random slots between 9 AM and 5 PM
    const slots = [];
    const availableHours = [9, 10, 11, 13, 14, 15, 16];
    
    availableHours.forEach(hour => {
      // 60% chance the slot is available
      if (Math.random() > 0.4) {
        const timeString = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
        slots.push({ id: `${i}-${hour}`, time: timeString, available: true });
      }
    });

    schedule.push({
      date: formattedDate,
      fullDate: date,
      slots
    });
  }
  return schedule;
};
