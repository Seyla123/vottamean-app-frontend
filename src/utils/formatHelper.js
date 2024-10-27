// Utility: Capitalize the first letter of each word
export const capitalize = (name) =>
  name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

// Utility: Format Date to a more readable format ("DD/MM/YYYY")
export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

// Utility: Ensure phone number formatting
export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{3,6})$/);
  return match
    ? `(+${match[1]}) ${match[2]}-${match[3]}-${match[4]}`
    : phoneNumber;
};

// Utility: Get user age
export const getAge = (dob) => {
  const birthDate = new Date(dob);
  return new Date().getFullYear() - birthDate.getFullYear();
};

// Utility: Calculation to get period of hour
export const calculatePeriod = (startTime, endTime) => {
  const diff = Math.abs(
    new Date(`1970-01-01T${endTime}Z`) - new Date(`1970-01-01T${startTime}Z`),
  );
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

// Utility: Format into standard hour AM or PM
export const formatTimeTo12Hour = (timeString) => {
  let [hours, minutes] = timeString.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
};

// Utility: Get Full Name from API response
export const getFullName = (info) =>
  info ? `${info.first_name} ${info.last_name}` : 'N/A';

// Helper function to determine profile key
export const getProfileKey = (role) =>
  role === 'admin' ? 'adminProfile' : 'teacherProfile';

// This is the function for formatting the time
export const formatStartEndTime = (classData) => {
  const time = `${formatTimeTo12Hour(classData.start_time)} - ${formatTimeTo12Hour(classData.end_time)}`;
  return time;
};

// Utility: Format time to HH:MM
export const formatTimeToHHMM = (time) => {
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};


/**
 * Transforms data into a format suitable for the Select component.
 * @param {array} data - List of data to be transformed.
 * @param {string} dataId - Key for the value in the data object.
 * @param {string|array} dataName - Key(s) for the label in the data object. Can be a string,
 *   an array of strings, or an array of strings with nested keys.
 *   If dataName is a string, it is used as the key for the label.
 *   If dataName is an array of strings, the values of the corresponding keys are joined
 *     with a ' - ' separator.
 *   If dataName is an array of strings with nested keys, the values of the corresponding
 *     nested keys are used as the label. For example, ['Info.first_name', 'Info.last_name']
 *     would result in a label like 'John Doe'.
 * @returns {array} - Transformed list of options.
 * @example
 * const data = [
 *   { id: 1, name: 'John', age: 25 },
 *   { id: 2, name: 'Jane', age: 30 },
 * ];
 * const options = transformedForSelector(data, 'id', 'name');
 * // options is now [{ value: 1, label: 'John' }, { value: 2, label: 'Jane' }]
 */
export const transformedForSelector = (data, dataId, dataName) => {
    if (!Array.isArray(data)) {
        data = [data];
    }

    return data.map((item) => {
        if (typeof dataName === 'string' && dataName.includes('.')) {
            const nestedKeys = dataName.split('.');
            let nestedValue = item;
            for (const key of nestedKeys) {
                nestedValue = nestedValue[key];
            }
            return {
                value: item[dataId],
                label: nestedValue,
            };
        } else if (Array.isArray(dataName)) {
            if (dataName.includes('start_time') && dataName.includes('end_time')) {
                return {
                    value: item[dataId],
                    label: `${formatTimeTo12Hour(item.start_time)} - ${formatTimeTo12Hour(item.end_time)}`,
                };
            } else if (dataName.includes('Info.first_name') && dataName.includes('Info.last_name')) {
                return {
                    value: item[dataId],
                    label: `${item.Info.first_name} ${item.Info.last_name}`,
                };
            } else {
                return {
                    value: item[dataId],
                    label: dataName.map(key => item[key]).join(' - '),
                };
            }
        } else {
            return {
                value: item[dataId],
                label: item[dataName],
            };
        }
    });
};


/**
 * Ensures an option is included in the list of options.
 * If the option is not present, it is added to the list.
 * 
 * @param {array} options - Array of current options.
 * @param {object} option - Option to be ensured in the list.
 * @param {string} valueKey - Key representing the option's value.
 * @param {string} labelKey - Key representing the option's label.
 * @returns {array} - New array of options with the ensured option.
 * 
 * Usage:
 * const resultOptions = ensureOptionInList(existingOptions, newOption, 'id', 'name');
 */
export const ensureOptionInList = (options, option, valueKey, labelKey) => {
    const formattedOptions = transformedForSelector(options, valueKey, labelKey);
    const formattedOption = transformedForSelector(option, valueKey, labelKey);
    
    const existingOption = formattedOptions.find((item) => item.value === formattedOption[0]?.value);
    
    if (!existingOption) {
        return [...formattedOption, ...formattedOptions];
    }
    return formattedOptions;
};

