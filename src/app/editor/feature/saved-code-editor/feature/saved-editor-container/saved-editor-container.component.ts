import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../../../shared/feature/local-storage-service/local-storage.service';
import { EditorService } from '../../../shared/data-access/editor-service/editor.service';
import { EditorComponent } from '../../../shared/feature/editor/editor.component';
import { SavedNavbarComponent } from '../saved-navbar/saved-navbar.component';

@Component({
  selector: 'app-saved-editor-container',
  standalone: true,
  imports: [EditorComponent, SavedNavbarComponent],
  templateUrl: './saved-editor-container.component.html',
})
export class SavedEditorContainerComponent implements OnInit {
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private editorService: EditorService
  ) {}

  ngOnInit(): void {
    try {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (!id) {
          this.router.navigate(['/create']);
          return;
        }
        const spark = this.localStorageService.getPersonalSpark(id);
        if (!spark) {
          this.router.navigate(['/create']);
        }
        this.editorService.inputCode.next(structuredClone(spark.code));
        this.editorService.sparkName.next(spark.name);
        this.editorService.sparkId.next(spark.id);
        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
