import type { SelectedPermission, AdditionalRequirements } from './PermissionType';

export interface ValidationError {
  field: string;
  message: string;
}

export function validatePermissions(
  selectedPermissions: SelectedPermission[],
  additionalRequirements: AdditionalRequirements[]
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (selectedPermissions.length === 0) {
    errors.push({
      field: 'permissions',
      message: 'Please select at least one permission'
    });
  }

  selectedPermissions.forEach(permission => {
    if (!permission.isApplication && !permission.isDelegated) {
      errors.push({
        field: `${permission.name}_type`,
        message: `Please select either Application or Delegated for ${permission.name}`
      });
    }

    if (!permission.justification?.trim()) {
      errors.push({
        field: `${permission.name}_justification`,
        message: `Please provide justification for ${permission.name}`
      });
    }
  });

  additionalRequirements.forEach(req => {
    if (!req.attachment) {
      errors.push({
        field: `${req.permission}_attachment`,
        message: `Please provide an attachment for ${req.permission}`
      });
    }
    if (!req.link) {
      errors.push({
        field: `${req.permission}_link`,
        message: `Please provide a link for ${req.permission}`
      });
    }
    if (!req.sites || req.sites.length === 0) {
      errors.push({
        field: `${req.permission}_sites`,
        message: `Please provide a list of sites for ${req.permission}`
      });
    }
  });

  return errors;
}