import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutService } from '../../_metronic/layout';
import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DemoComponent } from './demo/demo.component';

type Tabs = 'Header' | 'Toolbar' | 'PageTitle' | 'Aside' | 'Content' | 'Footer';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
})
export class BuilderComponent implements OnInit {
  activeTab: Tabs = 'Header';
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;
  constructor(
    private layout: LayoutService,
    private toaster: Toaster,
    public modelService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.model = this.layout.getConfig();
  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  resetPreview(): void {
    this.resetLoading = true;
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.configLoading = true;
    this.layout.setConfig(this.model);
    location.reload();
  }

  showToast(){
    const modalRef = this.modelService.open(DemoComponent, {centered : true, size: 'md'});
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    // this.toaster.open({text: 'Pizza party', caption: 'Hooray',type: 'danger'});
  }
}
