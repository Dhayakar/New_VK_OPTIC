import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleVSaccess, updateModuleMasterget } from '../../Models/ViewModels/RoleVSaccess.Model';
import { CommonService } from '../../shared/common.service';
import { AppComponent } from '../../app.component';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

declare var $: any;

@Component({
  selector: 'app-accessprivileges',
  templateUrl: './accessprivileges.component.html',
  styleUrls: ['./accessprivileges.component.less']
})

export class AccessprivilegesComponent implements OnInit {

  constructor(public commonService: CommonService<RoleVSaccess>, public appComponent: AppComponent, private router: Router, ) { }
  isInvalid = false;
  panelOpenState = false;
  Search;
  Name;
  Role;
  Rolename;
  Roleuser;
  GetUserrole;
  Selecteddata = [];

  Roleaccessdata;
  CompanyID: string;
  M_Viewaccess;
  workflow;
  outpatientssmenusmenu;



  cancelblock;
  backdrop;

  ngOnInit() {
    this.getAllDropdowns();
    this.commonService.data = new RoleVSaccess();

  }
  selecAllType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {
              parameter.All = true;
              parameter.Add = true;
              parameter.Edit = true;
              parameter.Update = true;
              parameter.Export = true;
              parameter.Delete = true;
            }

          });
        });
      });
    } else {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = false;
              parameter.Edit = false;
              parameter.Update = false;
              parameter.Export = false;
              parameter.Delete = false;
            }
          });
        });
      });
    }
  }
  selecAddType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {
              parameter.Add = true;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
              if (parameter.Add == true && parameter.Edit == true && parameter.Update == true && parameter.Export == true && parameter.Delete == true) {
                parameter.All = true;
              } else {
                parameter.All = false;
              }
            }

          });
        });
      });
    } else {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = false;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    }
  }
  selecEditType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {

              parameter.Add = data.Add;
              parameter.Edit = true;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
              if (parameter.Add == true && parameter.Edit == true && parameter.Update == true && parameter.Export == true && parameter.Delete == true) {
                parameter.All = true;
              } else {
                parameter.All = false;
              }
            }

          });
        });
      });
    } else {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = data.Add;
              parameter.Edit = false;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    }
  }
  selecUpdateType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {

              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = true;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
              if (parameter.Add == true && parameter.Edit == true && parameter.Update == true && parameter.Export == true && parameter.Delete == true) {
                parameter.All = true;
              } else {
                parameter.All = false;
              }
            }

          });
        });
      });
    } else {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = false;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    }
  }
  selecExportType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {

              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = true;
              parameter.Delete = data.Delete;
              if (parameter.Add == true && parameter.Edit == true && parameter.Update == true && parameter.Export == true && parameter.Delete == true) {
                parameter.All = true;
              } else {
                parameter.All = false;
              }
            }

          });
        });
      });
    } else {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = false;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    }
  }
  selecDeleteType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {

              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = true;
              if (parameter.Add == true && parameter.Edit == true && parameter.Update == true && parameter.Export == true && parameter.Delete == true) {
                parameter.All = true;
              } else {
                parameter.All = false;
              }
            }

          });
        });
      });
    } else {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          attribute.DataOriginalformsModule.map(function (parameter) {
            debugger;
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = false;
            }
          });
        });
      });
    }
  }
  selecworkflowAllType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].All = true;
          this.workflow[i].Add = true;
          this.workflow[i].Edit = true;
          this.workflow[i].Update = true;
          this.workflow[i].Export = true;
          this.workflow[i].Delete = true;
        }
      });
    } else {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].All = false;
          this.workflow[i].Add = false;
          this.workflow[i].Edit = false;
          this.workflow[i].Update = false;
          this.workflow[i].Export = false;
          this.workflow[i].Delete = false;
        }
      });
    }
  }
  selecworkflowAddType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].Add = true;
          this.workflow[i].Edit = data.Edit;
          this.workflow[i].Update = data.Update;
          this.workflow[i].Export = data.Export;
          this.workflow[i].Delete = data.Delete;
          if (this.workflow[i].Add == true && this.workflow[i].Edit == true && this.workflow[i].Update == true && this.workflow[i].Export == true && this.workflow[i].Delete == true) {
            this.workflow[i].All = true;
          } else {
            this.workflow[i].All = false;
          }
        }
      });
    } else {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].All = false;
          this.workflow[i].Add = false;
          this.workflow[i].Edit = data.Edit;
          this.workflow[i].Update = data.Update;
          this.workflow[i].Export = data.Export;
          this.workflow[i].Delete = data.Delete;
        }
      });
    }
  }
  selecworkflowEditType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].Add = data.Add;
          this.workflow[i].Edit = true;
          this.workflow[i].Update = data.Update;
          this.workflow[i].Export = data.Export;
          this.workflow[i].Delete = data.Delete;
          if (this.workflow[i].Add == true && this.workflow[i].Edit == true && this.workflow[i].Update == true && this.workflow[i].Export == true && this.workflow[i].Delete == true) {
            this.workflow[i].All = true;
          } else {
            this.workflow[i].All = false;
          }
        }
      });
    } else {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].All = false;
          this.workflow[i].Add = data.Add;
          this.workflow[i].Edit = false;
          this.workflow[i].Update = data.Update;
          this.workflow[i].Export = data.Export;
          this.workflow[i].Delete = data.Delete;
        }
      });
    }
  }
  selecworkflowUpdateType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].Add = data.Add;
          this.workflow[i].Edit = data.Edit;
          this.workflow[i].Update = true;
          this.workflow[i].Export = data.Export;
          this.workflow[i].Delete = data.Delete;
          if (this.workflow[i].Add == true && this.workflow[i].Edit == true && this.workflow[i].Update == true && this.workflow[i].Export == true && this.workflow[i].Delete == true) {
            this.workflow[i].All = true;
          } else {
            this.workflow[i].All = false;
          }
        }
      });
    } else {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].All = false;
          this.workflow[i].Add = data.Add;
          this.workflow[i].Edit = data.Edit;
          this.workflow[i].Update = false;
          this.workflow[i].Export = data.Export;
          this.workflow[i].Delete = data.Delete;
        }
      });
    }
  }
  selecworkflowExportType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].Add = data.Add;
          this.workflow[i].Edit = data.Edit;
          this.workflow[i].Update = data.Update;
          this.workflow[i].Export = true;
          this.workflow[i].Delete = data.Delete;
          if (this.workflow[i].Add == true && this.workflow[i].Edit == true && this.workflow[i].Update == true && this.workflow[i].Export == true && this.workflow[i].Delete == true) {
            this.workflow[i].All = true;
          } else {
            this.workflow[i].All = false;
          }
        }
      });
    } else {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].All = false;
          this.workflow[i].Add = data.Add;
          this.workflow[i].Edit = data.Edit;
          this.workflow[i].Update = data.Update;
          this.workflow[i].Export = false;
          this.workflow[i].Delete = data.Delete;
        }
      });
    }
  }
  selecworkflowDeleteType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].Add = data.Add;
          this.workflow[i].Edit = data.Edit;
          this.workflow[i].Update = data.Update;
          this.workflow[i].Export = data.Export;
          this.workflow[i].Delete = true;
          if (this.workflow[i].Add == true && this.workflow[i].Edit == true && this.workflow[i].Update == true && this.workflow[i].Export == true && this.workflow[i].Delete == true) {
            this.workflow[i].All = true;
          } else {
            this.workflow[i].All = false;
          }
        }
      });
    } else {
      this.workflow.map((todo, i) => {
        if (todo.formDescription == data.formDescription) {
          this.workflow[i].All = false;
          this.workflow[i].Add = data.Add;
          this.workflow[i].Edit = data.Edit;
          this.workflow[i].Update = data.Update;
          this.workflow[i].Export = data.Export;
          this.workflow[i].Delete = false;
        }
      });
    }
  }
  getAllDropdowns() {
    this.commonService.getListOfData('Common/getrolevaluesexceptadmin').subscribe(data => { this.Rolename = data; });
  }


  selecworkAllType(event, data, indexvalue) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = true;
              parameter.Add = true;
              parameter.Edit = true;
              parameter.Update = true;
              parameter.Export = true;
              parameter.Delete = true;
            }
          });
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = false;
              parameter.Edit = false;
              parameter.Update = false;
              parameter.Export = false;
              parameter.Delete = false;
            }
          });
        });
      });
    }
  }
  selecworkAddType(event, data, indexvalue) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = true;
              parameter.Add = true;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = false;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    }
  }
  selecworkEditType(event, data, indexvalue) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = true;
              parameter.Add = data.Add;
              parameter.Edit = true;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = data.Add;
              parameter.Edit = false;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    }
  }
  selecworkUpdateType(event, data, indexvalue) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = true;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = true;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = false;
              parameter.Export = data.Export;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    }
  }
  selecworkExportType(event, data, indexvalue) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = true;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = true;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = false;
              parameter.Delete = data.Delete;
            }
          });
        });
      });
    }
  }
  selecworkDeleteType(event, data, indexvalue) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = true;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = true;
            }
          });
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          attribute.workflowFgformsModule.map(function (parameter) {
            if (parameter.formDescription == data.formDescription) {
              parameter.All = false;
              parameter.Add = data.Add;
              parameter.Edit = data.Edit;
              parameter.Update = data.Update;
              parameter.Export = data.Export;
              parameter.Delete = false;
            }
          });
        });
      });
    }
  }
  selecsubAllType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = true;
            attribute.Add = true;
            attribute.Edit = true;
            attribute.Update = true;
            attribute.Export = true;
            attribute.Delete = true;
          }
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = false;
            attribute.Add = false;
            attribute.Edit = false;
            attribute.Update = false;
            attribute.Export = false;
            attribute.Delete = false;
          }
        });
      });
    }
  }
  selecsubAddType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = true;
            attribute.Add = true;
            attribute.Edit = data.Edit;
            attribute.Update = data.Update;
            attribute.Export = data.Export;
            attribute.Delete = data.Delete;
          }
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = false;
            attribute.Add = false;
            attribute.Edit = data.Edit;
            attribute.Update = data.Update;
            attribute.Export = data.Export;
            attribute.Delete = data.Delete;
          }
        });
      });
    }
  }
  selecsubEditType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = true;
            attribute.Add = data.Add;
            attribute.Edit = true;
            attribute.Update = data.Update;
            attribute.Export = data.Export;
            attribute.Delete = data.Delete;
          }
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = false;
            attribute.Add = data.Add;
            attribute.Edit = false;
            attribute.Update = data.Update;
            attribute.Export = data.Export;
            attribute.Delete = data.Delete;
          }
        });
      });
    }
  }
  selecsubUpdateType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = true;
            attribute.Add = data.Add;
            attribute.Edit = data.Edit;
            attribute.Update = true;
            attribute.Export = data.Export;
            attribute.Delete = data.Delete;
          }
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = false;
            attribute.Add = data.Add;
            attribute.Edit = data.Edit;
            attribute.Update = false;
            attribute.Export = data.Export;
            attribute.Delete = data.Delete;
          }
        });
      });
    }
  }
  selecsubExportType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = true;
            attribute.Add = data.Add;
            attribute.Edit = data.Edit;
            attribute.Update = data.Update;
            attribute.Export = true;
            attribute.Delete = data.Delete;
          }
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = false;
            attribute.Add = data.Add;
            attribute.Edit = data.Edit;
            attribute.Update = data.Update;
            attribute.Export = false;
            attribute.Delete = data.Delete;
          }
        });
      });
    }
  }
  selecsubDeleteType(event, data, index) {
    debugger;
    if (event.checked == true) {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = true;
            attribute.Add = data.Add;
            attribute.Edit = data.Edit;
            attribute.Update = data.Update;
            attribute.Export = data.Export;
            attribute.Delete = true;
          }
        });
      });
    } else {
      this.findingsworkflow.map(function (product) {
        product.workflowDataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.All = false;
            attribute.Add = data.Add;
            attribute.Edit = data.Edit;
            attribute.Update = data.Update;
            attribute.Export = data.Export;
            attribute.Delete = false;
          }
        });
      });
    }
  }

  Selectsubmodulewise(event, data, indexvalue) {
    debugger;
    if (event.checked == true) {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.DataOriginalformsModule.map(function (parameter) {
              parameter.All = true;
              parameter.Add = true;
              parameter.Edit = true;
              parameter.Update = true;
              parameter.Export = true;
              parameter.Delete = true;
            });
          }
        });
      });
    } else {
      this.outpatientssmenusmenu.map(function (product) {
        product.DataOriginalsubModule.map(function (attribute) {
          if (attribute.subDescription == data.subDescription) {
            attribute.DataOriginalformsModule.map(function (parameter) {
              parameter.All = false;
              parameter.Add = false;
              parameter.Edit = false;
              parameter.Update = false;
              parameter.Export = false;
              parameter.Delete = false;
            });
          }
        });
      });
    }
  }
  findingsworkflow;
  Selectuser() {
    debugger;
    let roleuser = this.Roleuser;
    // this.M_Viewaccess = null;
    this.CompanyID = localStorage.getItem('CompanyID');
    this.commonService.getListOfData('RoleVsAccess/GetAccessModulebasedonuser/' + roleuser + '/' + this.CompanyID + '/' + this.M_Viewaccess).subscribe((data: any) => {
      debugger;
      this.outpatientssmenusmenu = data.DataOriginalModule;
      this.workflow = data.Workflowaccerss;
      this.findingsworkflow = data.WorkflowDataOriginalmainModule;
    });
  }
  SelectAuser(code) {
    debugger;
    localStorage.setItem('Idcode', code);
  }
  Searchaccess() {

    debugger;

    this.commonService.data = new RoleVSaccess();

    this.commonService.getListOfData('RoleVsAccess/GetAccessPrivilegesDetails/' + this.Search + '/')
      .subscribe((data: any) => {
        data.ModuleNameGet.forEach((x: any) => {
          this.Name = x.UserName;
          this.Role = x.RoleDesc;
        });
      });

  }
  onSubmitaccess(form: NgForm) {
    debugger;
    if (form.valid) {
      this.isInvalid = false;
      this.commonService.data.UpdateModuleMaster = [];

      for (let i = 0; i < this.outpatientssmenusmenu.length; i++) {
        let submodules = this.outpatientssmenusmenu[i].DataOriginalsubModule;
        for (let j = 0; j < submodules.length; j++) {
          let fromsmodulesarray = submodules[j].DataOriginalformsModule;
          for (let k = 0; k < fromsmodulesarray.length; k++) {
            let Modeuledeta = new updateModuleMasterget();
            Modeuledeta.All = fromsmodulesarray[k].All;
            Modeuledeta.Add = fromsmodulesarray[k].Add;
            Modeuledeta.Edit = fromsmodulesarray[k].Edit;
            Modeuledeta.Update = fromsmodulesarray[k].Update;
            Modeuledeta.Export = fromsmodulesarray[k].Export;
            Modeuledeta.Delete = fromsmodulesarray[k].Delete;
            Modeuledeta.Desc = fromsmodulesarray[k].formDescription;
            Modeuledeta.ModType = fromsmodulesarray[k].Moduletypes;
            this.commonService.data.UpdateModuleMaster.push(Modeuledeta);
          }
        }
      }

      for (let l = 0; l < this.workflow.length; l++) {
        let Modeuledeta = new updateModuleMasterget();
        Modeuledeta.All = this.workflow[l].All;
        Modeuledeta.Add = this.workflow[l].Add;
        Modeuledeta.Edit = this.workflow[l].Edit;
        Modeuledeta.Update = this.workflow[l].Update;
        Modeuledeta.Export = this.workflow[l].Export;
        Modeuledeta.Delete = this.workflow[l].Delete;
        Modeuledeta.Desc = this.workflow[l].formDescription;
        Modeuledeta.ModType = this.workflow[l].Moduletypes;
        this.commonService.data.UpdateModuleMaster.push(Modeuledeta);
      }
      if (this.findingsworkflow.length != 0) {
        for (let i = 0; i < this.findingsworkflow.length; i++) {
          let submodules = this.findingsworkflow[i].workflowDataOriginalsubModule;
          for (let j = 0; j < submodules.length; j++) {
            let fromsmodulesarray = submodules[j].workflowFgformsModule;
            for (let k = 0; k < fromsmodulesarray.length; k++) {
              let Modeuledeta = new updateModuleMasterget();
              Modeuledeta.All = fromsmodulesarray[k].All;
              Modeuledeta.Add = fromsmodulesarray[k].Add;
              Modeuledeta.Edit = fromsmodulesarray[k].Edit;
              Modeuledeta.Update = fromsmodulesarray[k].Update;
              Modeuledeta.Export = fromsmodulesarray[k].Export;
              Modeuledeta.Delete = fromsmodulesarray[k].Delete;
              Modeuledeta.Desc = fromsmodulesarray[k].formDescription;
              Modeuledeta.ModType = fromsmodulesarray[k].Moduletypes;
              this.commonService.data.UpdateModuleMaster.push(Modeuledeta);
            }
          }
        }
      }

      if (this.findingsworkflow.length != 0) {
        for (let i = 0; i < this.findingsworkflow.length; i++) {
          let submodules = this.findingsworkflow[i].workflowDataOriginalsubModule;
          for (let j = 0; j < submodules.length; j++) {
            let Modeuledeta = new updateModuleMasterget();
            Modeuledeta.All = submodules[j].All;
            Modeuledeta.Add = submodules[j].Add;
            Modeuledeta.Edit = submodules[j].Edit;
            Modeuledeta.Update = submodules[j].Update;
            Modeuledeta.Export = submodules[j].Export;
            Modeuledeta.Delete = submodules[j].Delete;
            Modeuledeta.Desc = submodules[j].subDescription;
            Modeuledeta.ModType = submodules[j].Moduletypes;
            this.commonService.data.UpdateModuleMaster.push(Modeuledeta);
          }
        }
      }

      console.log(this.commonService.data);
      this.commonService.data.CmpID = localStorage.getItem('CompanyID');
      this.commonService.data.Roleid = this.Roleuser;
      this.commonService.data.userdoctorid = localStorage.getItem('userroleID');
      this.commonService.postData('RoleVsAccess/InsertAccessPrivileges', this.commonService.data)
        .subscribe(data => {


          debugger;

          if (data.Success == true) {
            debugger;

            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Access Granted , please Logout to save Changes',
              showConfirmButton: false,
              timer: 3000
            });
            this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
              this.router.navigate(['useraccess']);
            });
          } else {
            Swal.fire({
              position: 'center',
              type: 'warning',
              title: 'Some Data Is Missing',
              showConfirmButton: false,
              timer: 3000
            });
          }

        });

    }

  }

  oncancel() {
    this.backdrop = 'block';
    this.cancelblock = 'block';
  }

  modalcloseOk() {
    this.backdrop = 'none';
    this.cancelblock = 'none';
  }
  modalSuccesssOk() {
    this.cancelblock = 'none';
    this.modalSuccessClosessss();

    this.router.navigateByUrl('/dash', { skipLocationChange: true }).then(() => {
      this.router.navigate(['useraccess']);
    });



  }


  modalSuccessClosessss() {
    debugger;
    this.backdrop = 'none';
    this.cancelblock = 'none';

  }



  ////////////////////////////////////////////////////////////////////

}
